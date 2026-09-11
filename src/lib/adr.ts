/**
 * ADR-слой: статус решения — вычисляемая величина, не то, что пишется руками.
 * "Предложено" не существует как статус на сайте — на сайт попадают только
 * решения, уже смёрженные в main. По умолчанию решение "Принято"; становится
 * "Заменено" автоматически, если найдётся другой ADR, чей frontmatter.supersedes
 * называет его номер.
 */
import { pages, type Page } from './docs';
// ?raw — сырой текст файла; Vite отдаёт его как обычный модуль без плагинов.
import tagsYamlRaw from '../../docs/gamedesign/decisions/tags.yml?raw';

/**
 * Мини-парсер под ОДНУ конкретную форму YAML (плоский список слаг → {label, color}),
 * а не универсальный YAML. Пакет `yaml` ломается под Vite dev SSR ("require is not
 * defined" — его CJS-сборка не грузится ESM-раннером), а тянуть его только ради
 * пяти строк конфига того не стоит.
 */
function parseTagsYaml(raw: string): Record<string, { label: string; color: string }> {
  const result: Record<string, { label: string; color: string }> = {};
  let current: string | null = null;

  for (const rawLine of raw.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const topLevel = line.match(/^(\S[^:]*):\s*$/);
    if (topLevel) {
      current = topLevel[1].trim();
      result[current] = { label: '', color: '' };
      continue;
    }

    const field = line.match(/^\s+(label|color):\s*(.+)$/);
    if (field && current) {
      result[current][field[1] as 'label' | 'color'] = field[2].trim().replace(/^['"]|['"]$/g, '');
    }
  }

  return result;
}

export interface Tag {
  slug: string;
  label: string;
  color: string;
  /** Текст поверх сплошной заливки color — чёрный или белый, считается по яркости. */
  textColor: string;
}

/** WCAG relative luminance — тот же принцип, каким GitHub решает, чёрный текст на лейбле или белый. */
function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(clean)) return 0; // неизвестный формат — по умолчанию светлый текст
  const channel = (i: number) => parseInt(clean.slice(i, i + 2), 16) / 255;
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(channel(0)) + 0.7152 * linear(channel(2)) + 0.0722 * linear(channel(4));
}

function textColorFor(hex: string): string {
  return relativeLuminance(hex) > 0.5 ? '#14161a' : '#f4f3f1';
}

/**
 * "2026-02-01" в YAML без кавычек парсится в Date (YAML 1.1 core schema),
 * который потом сериализуется в "2026-02-01T00:00:00.000Z" — отсюда
 * уродливый ISO-таймстамп на карточке. Возвращаем понятное "01.02.2026".
 * UTC-методы обязательны: локальным getDate() дату может сдвинуть на день
 * в отрицательных часовых поясах.
 */
function formatDate(value: unknown): string | undefined {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getUTCFullYear()}`;
}

const tagsRegistry: Tag[] = Object.entries(parseTagsYaml(tagsYamlRaw)).map(([slug, value]) => ({
  slug,
  label: value.label,
  color: value.color,
  textColor: textColorFor(value.color),
}));

const tagsBySlug = new Map(tagsRegistry.map((tag) => [tag.slug, tag]));

/** Тег без записи в реестре всё равно отображается — нейтральным серым. */
function resolveTag(slug: string): Tag {
  return tagsBySlug.get(slug) ?? { slug, label: slug, color: '#3f3f46', textColor: '#f4f3f1' };
}

export function getAllTags(): Tag[] {
  return tagsRegistry;
}

export interface AdrEntry {
  page: Page;
  /** Номер — префикс имени файла (0007-foo.md → 7), не отдельное поле frontmatter. */
  number: number;
  title: string;
  /** Уже отформатирован под "ДД.ММ.ГГГГ" — карточка ничего не форматирует сама. */
  date?: string;
  tags: Tag[];
  status: 'accepted' | 'superseded';
  supersedes: number[];
  supersededBy?: AdrEntry;
  /** title + номер + дата одной строкой в нижнем регистре — по этому полю ищет JS на странице. */
  searchText: string;
}

const DECISIONS_DIR = 'gamedesign/decisions';

function parseNumber(page: Page): number | null {
  const filename = page.path.split('/').pop()!;
  const match = filename.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

export function getAdrEntries(): AdrEntry[] {
  const entries = pages
    .filter((page) => page.dir === DECISIONS_DIR)
    .map((page): AdrEntry | null => {
      const number = parseNumber(page);
      if (number === null) return null;
      const date = formatDate(page.frontmatter.date);
      const numberLabel = `#${String(number).padStart(4, '0')}`;
      return {
        page,
        number,
        title: page.title,
        date,
        tags: (page.frontmatter.tags ?? []).map(resolveTag),
        supersedes: page.frontmatter.supersedes ?? [],
        status: 'accepted',
        searchText: `${page.title} ${numberLabel} ${date ?? ''}`.toLowerCase(),
      };
    })
    .filter((entry): entry is AdrEntry => entry !== null);

  const byNumber = new Map(entries.map((entry) => [entry.number, entry]));

  for (const entry of entries) {
    for (const supersededNumber of entry.supersedes) {
      const target = byNumber.get(supersededNumber);
      if (target) {
        target.status = 'superseded';
        target.supersededBy = entry;
        // Номер известен только после этого прохода — дописываем в поиск постфактум.
        const supersededByLabel = `#${String(entry.number).padStart(4, '0')}`;
        target.searchText += ` ${supersededByLabel}`;
      }
    }
  }

  return entries.sort((a, b) => b.number - a.number);
}
