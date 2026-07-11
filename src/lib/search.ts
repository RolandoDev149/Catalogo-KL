import { products, categories } from '@/data/products';
import { Product, Category } from '@/types/product';

/** Minúsculas, sin tildes y sin signos: para comparar de forma flexible. */
export function normalizeText(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '') // quita tildes
    .replace(/[^a-z0-9\s]/g, ' ') // signos -> espacio
    .replace(/\s+/g, ' ')
    .trim();
}

/** Distancia de edición (Levenshtein) para tolerar errores de tecleo. */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : Math.min(prev, dp[j], dp[j - 1]) + 1;
      prev = tmp;
    }
  }
  return dp[n];
}

/** ¿Coincide una palabra de la búsqueda con una del texto? (plural/singular + typos) */
function tokenMatch(qt: string, tt: string): boolean {
  if (!qt) return true;
  if (tt.includes(qt) || qt.includes(tt)) return true; // prefijo/subcadena
  if (qt.replace(/s$/, '') === tt.replace(/s$/, '')) return true; // plural vs singular
  const maxDist = qt.length <= 4 ? 1 : 2; // tolerancia según longitud
  return levenshtein(qt, tt) <= maxDist;
}

/**
 * Puntúa qué tan relevante es `text` para `query`.
 * 0 = no coincide. Cuanto mayor, más relevante (para ordenar resultados).
 */
export function scoreText(query: string, text: string): number {
  const q = normalizeText(query);
  const t = normalizeText(text);
  if (!q) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 90;
  if (t.includes(q)) return 75;

  const qTokens = q.split(' ').filter(Boolean);
  const tTokens = t.split(' ').filter(Boolean);
  let matched = 0;
  let usedFuzzy = false;

  for (const qt of qTokens) {
    let best = 0;
    for (const tt of tTokens) {
      if (tt.includes(qt) || qt.includes(tt)) {
        best = Math.max(best, 2);
      } else if (tokenMatch(qt, tt)) {
        best = Math.max(best, 1);
        usedFuzzy = true;
      }
    }
    if (best === 0) return 0; // una palabra no coincidió con nada -> descarta
    matched += best;
  }
  return (usedFuzzy ? 30 : 55) + matched;
}

/** Verdadero si el texto es una coincidencia razonable de la búsqueda. */
export function matchesQuery(query: string, text: string): boolean {
  return scoreText(query, text) > 0;
}

export function searchProducts(query: string, limit = 6): Product[] {
  if (!normalizeText(query)) return [];
  return products
    .map((p) => ({ p, s: scoreText(query, p.name) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.p);
}

/** Puntúa una categoría por su nombre, su slug y los nombres de sus subcategorías. */
function scoreCategory(query: string, c: Category): number {
  let best = Math.max(scoreText(query, c.name), scoreText(query, c.slug));
  for (const sub of c.subcategories ?? []) {
    best = Math.max(best, scoreText(query, sub.name));
  }
  return best;
}

export function searchCategories(query: string, limit = 6): Category[] {
  if (!normalizeText(query)) return [];
  return categories
    .map((c) => ({ c, s: scoreCategory(query, c) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.c);
}
