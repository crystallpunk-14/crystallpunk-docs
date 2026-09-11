/**
 * Ядро сайта: превращает дерево файлов docs/ в страницы и навигацию.
 *
 * Правила, на которых всё держится:
 *  - страницей становится любой .md внутри docs/;
 *  - заголовок берётся из первого H1 внутри файла, никогда из frontmatter;
 *  - числовой префикс имени файла (01-, 02-) задаёт порядок и вырезается из URL;
 *  - accent и navigationFolder наследуются от index.md вышестоящих папок,
 *    а относительные пути в них резолвятся от того файла, который их ОБЪЯВИЛ.
 */

/** Поля frontmatter, которые наследуются вниз по дереву папок. */
const INHERITED_KEYS = ['accent', 'navigationFolder'] as const;

export interface PageFrontmatter {
  /** Картинка-баннер относительно docs/_assets. Не наследуется. */
  banner?: string;
  /** Акцентный цвет раздела, любой CSS-цвет: "#ffff00". Наследуется. */
  accent?: string;
  /** Папка, по которой строится боковая навигация. Наследуется. */
  navigationFolder?: string;
  /** Позиция в навигации, меньше — выше. Не наследуется. */
  order?: number;
  /** Только для главной: список папок-разделов под кнопки. */
  buttons?: string[];
  /** Подпись под заголовком. */
  description?: string;
}

export interface Page {
  /** Путь относительно docs/ без расширения: "tech/z-levels/01-z-level-mapping". */
  path: string;
  /** Готовый URL с base: "/crystallpunk-docs/tech/z-levels/z-level-mapping/". */
  url: string;
  /** Путь для getStaticPaths, без base и крайних слэшей: "tech/z-levels/z-level-mapping". */
  routeSlug: string;
  /** Папка относительно docs/: "tech/z-levels" (для корня — ""). */
  dir: string;
  /** Первый сегмент пути, он же раздел: "tech". */
  section: string;
  isIndex: boolean;
  title: string;
  frontmatter: PageFrontmatter;
  /** Компонент Astro для рендера тела документа. */
  Content: unknown;
}

type MdModule = {
  frontmatter?: PageFrontmatter;
  Content: unknown;
  getHeadings?: () => Array<{ depth: number; text: string }>;
};

const modules = import.meta.glob<MdModule>('/docs/**/*.md', { eager: true });

/** Склеивает base сайта с внутренним путём, не плодя двойных слэшей. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const rest = String(path).replace(/^\/+/, '');
  return rest ? `${base}/${rest}` : `${base}/`;
}

/** Убирает числовой префикс: "01-visual-style" -> "visual-style". */
function stripOrderPrefix(segment: string): string {
  return segment.replace(/^\d+[-_.]\s*/, '');
}

/** Нормализует "a/b/../c" и "./x" в "a/c" и "x". */
function normalizePath(path: string): string {
  const out: string[] = [];
  for (const segment of path.split('/')) {
    if (!segment || segment === '.') continue;
    if (segment === '..') out.pop();
    else out.push(segment);
  }
  return out.join('/');
}

/** Запасной заголовок, когда в файле нет H1: "z-levels" -> "Z levels". */
function prettify(segment: string): string {
  const words = stripOrderPrefix(segment).replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function buildPage(moduleId: string, mod: MdModule): Page {
  const path = moduleId.replace(/^\/docs\//, '').replace(/\.md$/, '');
  const segments = path.split('/');
  const isIndex = segments[segments.length - 1] === 'index';

  const urlSegments = (isIndex ? segments.slice(0, -1) : segments).map(stripOrderPrefix);
  const routeSlug = urlSegments.join('/');

  const headings = mod.getHeadings?.() ?? [];
  const h1 = headings.find((heading) => heading.depth === 1);

  return {
    path,
    url: withBase(routeSlug ? `${routeSlug}/` : ''),
    routeSlug,
    dir: segments.slice(0, -1).join('/'),
    section: segments.length > 1 ? stripOrderPrefix(segments[0]) : '',
    isIndex,
    title: h1?.text ?? prettify(segments[segments.length - 1]),
    frontmatter: mod.frontmatter ?? {},
    Content: mod.Content,
  };
}

export const pages: Page[] = Object.entries(modules)
  .map(([id, mod]) => buildPage(id, mod))
  .sort((a, b) => a.path.localeCompare(b.path));

const byPath = new Map(pages.map((page) => [page.path, page]));

/** index.md указанной папки, если он есть. */
function indexOf(dir: string): Page | undefined {
  return byPath.get(dir ? `${dir}/index` : 'index');
}

/**
 * Собирает эффективный frontmatter: наследуемые поля стекаются от корня вниз,
 * собственные поля страницы перекрывают унаследованные.
 *
 * Относительные пути резолвятся от объявившей папки — иначе унаследованная
 * "." у вложенной страницы указывала бы на её собственную папку, а не на раздел.
 */
export function resolveConfig(page: Page): PageFrontmatter {
  const resolved: PageFrontmatter = {};
  const segments = page.dir ? page.dir.split('/') : [];

  const applyFrom = (dir: string, frontmatter: PageFrontmatter) => {
    for (const key of INHERITED_KEYS) {
      const value = frontmatter[key];
      if (value === undefined) continue;
      resolved[key] =
        key === 'navigationFolder'
          ? normalizePath(`${dir}/${value}`)
          : (value as string);
    }
  };

  // От корня к листу: каждый следующий index.md перекрывает предыдущий.
  for (let depth = 0; depth <= segments.length; depth++) {
    const dir = segments.slice(0, depth).join('/');
    const index = indexOf(dir);
    if (index && index.path !== page.path) applyFrom(dir, index.frontmatter);
  }
  applyFrom(page.dir, page.frontmatter);

  // Ненаследуемые поля — только собственные.
  if (page.frontmatter.banner) resolved.banner = page.frontmatter.banner;
  if (page.frontmatter.description) resolved.description = page.frontmatter.description;

  return resolved;
}

export interface NavNode {
  kind: 'page' | 'group';
  title: string;
  /** null у группы без собственного index.md — она только раскрывается. */
  url: string | null;
  path: string;
  children: NavNode[];
}

function sortKey(page: Page): [number, string] {
  return [page.frontmatter.order ?? Number.MAX_SAFE_INTEGER, page.path];
}

/**
 * Строит дерево навигации по папке: файлы становятся пунктами,
 * подпапки — раскрывающимися группами. index.md папки в список не попадает,
 * он даёт группе заголовок и ссылку.
 */
export function buildNav(folder: string): NavNode[] {
  const prefix = folder ? `${folder}/` : '';
  const childFiles: Page[] = [];
  const childDirs = new Set<string>();

  for (const page of pages) {
    if (!page.path.startsWith(prefix)) continue;
    const rest = page.path.slice(prefix.length);
    if (!rest) continue;

    const slash = rest.indexOf('/');
    if (slash === -1) {
      if (rest !== 'index') childFiles.push(page);
    } else {
      childDirs.add(rest.slice(0, slash));
    }
  }

  const fileNodes: NavNode[] = childFiles.map((page) => ({
    kind: 'page',
    title: page.title,
    url: page.url,
    path: page.path,
    children: [],
  }));

  const dirNodes: NavNode[] = [...childDirs].map((name) => {
    const dir = `${prefix}${name}`;
    const index = indexOf(dir);
    return {
      kind: 'group',
      title: index?.title ?? prettify(name),
      url: index?.url ?? null,
      path: dir,
      children: buildNav(dir),
    };
  });

  // Папки без единого .md внутри (например artstyle/templates) на сайт не идут.
  const nodes = [...fileNodes, ...dirNodes.filter((node) => node.children.length > 0 || node.url)];

  return nodes.sort((a, b) => {
    const pageA = byPath.get(a.path) ?? indexOf(a.path);
    const pageB = byPath.get(b.path) ?? indexOf(b.path);
    const [orderA, nameA] = pageA ? sortKey(pageA) : [Number.MAX_SAFE_INTEGER, a.path];
    const [orderB, nameB] = pageB ? sortKey(pageB) : [Number.MAX_SAFE_INTEGER, b.path];
    return orderA - orderB || nameA.localeCompare(nameB);
  });
}

/** Разделы — папки первого уровня, у которых есть index.md. Без него папка не публикуется. */
export function getSections(): Page[] {
  return pages
    .filter((page) => page.isIndex && page.dir !== '' && !page.dir.includes('/'))
    .sort((a, b) => {
      const [orderA, nameA] = sortKey(a);
      const [orderB, nameB] = sortKey(b);
      return orderA - orderB || nameA.localeCompare(nameB);
    });
}

export function getSectionByName(name: string): Page | undefined {
  return indexOf(name);
}

/**
 * Резолвит имя из buttons/navigationFolder относительно папки, в которой
 * оно объявлено — тот же принцип, что и в resolveConfig. "gamedesign" из
 * корня даёт обложку раздела, "complexity" из docs/gamedesign/index.md даёт
 * соседний файл docs/gamedesign/complexity.md.
 */
export function resolveRelativePage(fromDir: string, target: string): Page | undefined {
  const path = normalizePath(fromDir ? `${fromDir}/${target}` : target);
  return byPath.get(path) ?? byPath.get(path ? `${path}/index` : 'index');
}

export const homePage = byPath.get('index');

/** Баннер может быть внешней ссылкой или файлом из docs/_assets. */
export function bannerUrl(banner: string | undefined): string | null {
  if (!banner) return null;
  return /^https?:\/\//.test(banner) ? banner : withBase(banner);
}
