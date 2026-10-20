// SPOT OS · textos derivados de números.

/** "1 carpeta", "3 carpetas". */
export function countLabel(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
