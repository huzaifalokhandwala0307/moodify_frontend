import { type ClassValue, clsx } from 'clsx';

/** Merge Tailwind classes (lightweight — no tailwind-merge needed) */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Format similarity as percentage: 0.94 → "94%" */
export function formatSimilarity(value: number | null): string {
  if (value === null || value === undefined) return '—';
  return `${Math.round(value * 100)}%`;
}

/** Format score to 2 decimals */
export function formatScore(value: number | null): string {
  if (value === null || value === undefined) return '—';
  return value.toFixed(2);
}

/** Format popularity as integer */
export function formatPopularity(value: number | null): string {
  if (value === null || value === undefined) return '—';
  return Math.round(value).toString();
}
