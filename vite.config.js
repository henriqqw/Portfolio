import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderArticleCards } from './src/js/articles.js';

const ARTICLES_FILE = fileURLToPath(new URL('./src/data/articles.json', import.meta.url));
const ARTICLES_SLOT = /<!-- articles:list[^>]*-->/;

/* Renders the Medium article cards from articles.json into index.html.
   Runs "pre" so Vite still rewrites the card image URLs to hashed assets. */
function mediumArticles() {
  return {
    name: 'medium-articles',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const articles = JSON.parse(readFileSync(ARTICLES_FILE, 'utf8'));
        return html.replace(ARTICLES_SLOT, renderArticleCards(articles));
      }
    },
    configureServer(server) {
      server.watcher.add(ARTICLES_FILE);
      server.watcher.on('change', (file) => {
        if (file === ARTICLES_FILE) server.ws.send({ type: 'full-reload' });
      });
    }
  };
}

export default defineConfig({
  plugins: [mediumArticles()]
});
