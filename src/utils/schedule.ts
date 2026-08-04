import type { CollectionEntry } from 'astro:content';

/** Sort key in minutes since midnight for a normalized "H:MM AM/PM" time string. */
export function parseTimeMinutes(startTime: string): number {
  const match = startTime.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);
  if (!match) throw new Error(`Unrecognized time format: "${startTime}"`);
  const [, h, m, ap] = match;
  let hours = Number(h) % 12;
  if (ap === 'PM') hours += 12;
  return hours * 60 + Number(m);
}

export interface ScheduleOccurrence {
  id: string;
  title: string;
  host: string;
  startTime: string;
  endTime?: string;
  location: string;
  categories: string[];
  chatBlock: number | null;
  description?: string;
  otherTimes: { day: string; startTime: string; location: string }[];
}

type Day = 'Thursday' | 'Friday' | 'Saturday';

/**
 * Flattens each session's primary entry plus any `repeatsOn` entries that
 * fall on `day` into one time-sorted list. `otherTimes` on each occurrence
 * lists every other time/day this session runs, for the "🔁 also at..." tag.
 */
export function occurrencesForDay(
  sessions: CollectionEntry<'schedule'>[],
  day: Day,
): ScheduleOccurrence[] {
  const occurrences: ScheduleOccurrence[] = [];

  for (const { id, data } of sessions) {
    const allTimes = [
      { day: data.day, startTime: data.startTime, location: data.location },
      ...data.repeatsOn,
    ];

    for (const occurrence of allTimes) {
      if (occurrence.day !== day) continue;
      const isPrimary = occurrence.day === data.day && occurrence.startTime === data.startTime;
      occurrences.push({
        id,
        title: data.title,
        host: data.host,
        startTime: occurrence.startTime,
        endTime: isPrimary ? data.endTime : undefined,
        location: occurrence.location,
        categories: data.categories,
        chatBlock: data.chatBlock,
        description: data.description,
        otherTimes: allTimes.filter(
          (t) => !(t.day === occurrence.day && t.startTime === occurrence.startTime),
        ),
      });
    }
  }

  return occurrences.sort((a, b) => parseTimeMinutes(a.startTime) - parseTimeMinutes(b.startTime));
}
