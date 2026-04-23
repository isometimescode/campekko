/** "November 7, 2025" or "Thursday, November 7, 2025" */
export function dateFull(input: Date, { weekday = false } = {}): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: weekday ? 'long' : undefined,
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(input);
}

/** "Nov 7" */
export function dateShort(input: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric',
  }).format(input);
}

/** "2025" */
export function dateYear(input: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
  }).format(input);
}

/** "November 7–11, 2025" or "Thursday, November 7 – Monday, November 11, 2025" */
export function dateRange(start: Date, end: Date, { weekday = false } = {}): string {
  if (weekday) {
    const fmt = (d: Date) => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(d);
    const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(end);
    return `${fmt(start)} – ${fmt(end)}, ${year}`;
  }
  if (start.getMonth() === end.getMonth()) {
    const startFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(start);
    const endFmt = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(end);
    const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(end);
    return `${startFmt}-${endFmt}, ${year}`;
  }
  return `${dateShort(start)}-${dateShort(end)}, ${dateYear(end)}`;
}
