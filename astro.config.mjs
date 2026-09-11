import { defineConfig } from 'astro/config';

// Сайт публикуется как project page: https://crystallpunk-14.github.io/crystallpunk-docs/
// Поэтому base обязателен — без него все внутренние ссылки уедут в корень домена.
export default defineConfig({
  site: 'https://crystallpunk-14.github.io',
  base: '/crystallpunk-docs',
  trailingSlash: 'always',

  // Всё из docs/_assets отдаётся с корня сайта: docs/_assets/art.webp -> /crystallpunk-docs/art.webp
  // Это делает banner: art.webp во frontmatter рабочим без импортов.
  publicDir: './docs/_assets',

  // Пайплайн GitHub Actions публикует именно ./site — менять деплой-шаг не требуется.
  outDir: './site',

  devToolbar: { enabled: false },

  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: true,
    },
  },
});
