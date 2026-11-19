/* ============================================================
   caosdev — Medium articles
   src/data/articles.json is the single source of truth. Vite
   renders the cards into index.html at build time (see
   vite.config.js) and i18n.js merges the PT/EN strings into its
   DICT, so the cards stay static HTML for SEO and link previews.
   ============================================================ */

var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
var MONTHS_PT = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

// "2026-11-03" → PT "03 NOV 2026" / EN "NOV 03, 2026"
function formatDate(iso, lang) {
  var parts = iso.split('-');
  var month = Number(parts[1]) - 1;
  return lang === 'en'
    ? MONTHS[month] + ' ' + parts[2] + ', ' + parts[0]
    : parts[2] + ' ' + MONTHS_PT[month] + ' ' + parts[0];
}

function readLabel(minutes, lang) {
  return lang === 'en' ? minutes + ' min read' : minutes + ' min de leitura';
}

export function articleDict(articles) {
  var dict = {};
  articles.forEach(function (a) {
    var key = 'art.' + a.id;
    dict[key + '.alt'] = a.alt;
    dict[key + '.desc'] = a.desc;
    dict[key + '.date'] = { pt: formatDate(a.date, 'pt'), en: formatDate(a.date, 'en') };
    dict[key + '.read'] = { pt: readLabel(a.readMinutes, 'pt'), en: readLabel(a.readMinutes, 'en') };
  });
  return dict;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderArticleCards(articles) {
  return articles.map(function (a) {
    var key = 'art.' + a.id;
    var tags = a.tags.map(function (t) { return '<li>' + escapeHtml(t) + '</li>'; }).join('');
    return '' +
      '<a class="article-card reveal" href="' + escapeHtml(a.url) + '" target="_blank" rel="noreferrer">' +
        '<img src="' + escapeHtml(a.image.src) + '" data-i18n-alt="' + key + '.alt" alt="' + escapeHtml(a.alt.pt) + '"' +
          ' width="' + a.image.width + '" height="' + a.image.height + '" loading="lazy" decoding="async">' +
        '<div>' +
          '<header>' +
            '<small><time datetime="' + a.date + '" data-i18n="' + key + '.date">' + formatDate(a.date, 'pt') + '</time>' +
            ' · <span data-i18n="' + key + '.read">' + readLabel(a.readMinutes, 'pt') + '</span></small>' +
            '<span class="article-link" data-i18n="articles.read">ler no medium ↗</span>' +
          '</header>' +
          '<h3>' + escapeHtml(a.title) + '</h3>' +
          '<p data-i18n="' + key + '.desc">' + escapeHtml(a.desc.pt) + '</p>' +
          '<ul>' + tags + '</ul>' +
        '</div>' +
      '</a>';
  }).join('\n');
}
