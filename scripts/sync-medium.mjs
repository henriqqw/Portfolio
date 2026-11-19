/* ============================================================
   caosdev — Medium sync
   Reads the Medium RSS feed and adds any article missing from
   src/data/articles.json: downloads the cover as .webp, builds
   the card data and inserts it right after the pinned articles.
   Run by .github/workflows/medium-sync.yml; `npm run sync:medium`
   runs it locally.
   ============================================================ */

import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const FEED_URL = 'https://henriqqw.medium.com/feed';
const ARTICLES_FILE = fileURLToPath(new URL('../src/data/articles.json', import.meta.url));
const IMAGES_DIR = fileURLToPath(new URL('../src/assets/images/', import.meta.url));
const FALLBACK_IMAGE = { src: '/favicon/og-image.png', width: 512, height: 512 };

const COVER_WIDTH = 768;
const MAX_COVER_RATIO = 2.2;   // wider covers get padded so the card crop keeps the logo
const WORDS_PER_MINUTE = 265;  // close to Medium's own estimate
const MAX_TAGS = 4;

// Medium tag slugs that read better spelled out
const TAG_NAMES = { golang: 'Go', cve: 'CVE', rce: 'RCE', mcps: 'MCP', mcp: 'MCP', ai: 'AI', api: 'API' };

/* ——— Feed parsing (Medium's feed is regular enough for regexes) ——— */

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function field(item, tag) {
  const match = item.match(new RegExp('<' + tag + '(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</' + tag + '>'));
  return match ? match[1].trim() : '';
}

function parseFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const content = field(item, 'content:encoded');
    const mediumId = field(item, 'guid').split('/').pop();
    return {
      mediumId,
      title: decodeEntities(field(item, 'title')),
      url: field(item, 'link').split('?')[0],
      date: new Date(field(item, 'pubDate')).toISOString().slice(0, 10),
      categories: [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)].map((m) => m[1]),
      coverUrl: (content.match(/<img[^>]+src="([^"]+)"/) || [])[1],
      paragraphs: [...content.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => stripTags(m[1])).filter(Boolean),
      words: stripTags(content).split(' ').length
    };
  });
}

/* ——— Card data ——— */

function tagName(slug) {
  if (TAG_NAMES[slug]) return TAG_NAMES[slug];
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Card summaries match the ones already on the site, measured from articles.json
function averageDescLength(articles) {
  if (!articles.length) return 180;
  const total = articles.reduce((sum, a) => sum + a.desc.pt.length, 0);
  return Math.round(total / articles.length);
}

// Opening text cut at the last whole word that fits, with "…" when it was cut
function makeExcerpt(paragraphs, maxLength) {
  const text = paragraphs.join(' ');
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.—–-]+$/, '') + '…';
}

async function saveCover(url, mediumId) {
  if (!url) return FALLBACK_IMAGE;

  const response = await fetch(url);
  if (!response.ok) return FALLBACK_IMAGE;

  let image = sharp(Buffer.from(await response.arrayBuffer())).resize({ width: COVER_WIDTH });
  const resized = await image.toBuffer({ resolveWithObject: true });
  image = sharp(resized.data);

  const { width, height } = resized.info;
  if (width / height > MAX_COVER_RATIO) {
    // Pad top/bottom with the cover's own corner color
    const { data } = await sharp(resized.data).extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
    const pad = Math.round((width / MAX_COVER_RATIO - height) / 2);
    image = image.extend({ top: pad, bottom: pad, background: { r: data[0], g: data[1], b: data[2] } });
  }

  const file = 'article-' + mediumId + '-768.webp';
  const info = await image.webp({ quality: 82 }).toFile(IMAGES_DIR + file);
  return { src: '/src/assets/images/' + file, width: info.width, height: info.height };
}

async function toArticle(post, descLength) {
  // A post with no paragraphs (image-only) still needs text on the card
  const excerpt = makeExcerpt(post.paragraphs, descLength) || post.title;
  return {
    id: post.mediumId,
    mediumId: post.mediumId,
    url: post.url,
    title: post.title,
    date: post.date,
    readMinutes: Math.max(1, Math.ceil(post.words / WORDS_PER_MINUTE)),
    image: await saveCover(post.coverUrl, post.mediumId),
    alt: { pt: 'Capa do artigo ' + post.title, en: 'Cover of the article ' + post.title },
    desc: { pt: excerpt, en: excerpt },
    tags: post.categories.slice(0, MAX_TAGS).map(tagName)
  };
}

/* ——— Main ——— */

const response = await fetch(FEED_URL, { headers: { 'User-Agent': 'Mozilla/5.0 (portfolio medium sync)' } });
if (!response.ok) throw new Error('Medium feed returned ' + response.status);

const articles = JSON.parse(readFileSync(ARTICLES_FILE, 'utf8'));
const known = new Set(articles.map((a) => a.mediumId));
const descLength = averageDescLength(articles);

// Feed is newest first; reverse so the newest ends up highest after insertion
const fresh = parseFeed(await response.text()).filter((p) => p.mediumId && !known.has(p.mediumId)).reverse();

for (const post of fresh) {
  const article = await toArticle(post, descLength);
  const afterPinned = articles.filter((a) => a.pinned).length;
  articles.splice(afterPinned, 0, article);
  console.log('added: ' + article.title);
}

if (fresh.length) writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2) + '\n');
else console.log('no new articles');

if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, 'added=' + fresh.length + '\n');
