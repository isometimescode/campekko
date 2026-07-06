interface EventLocation {
  venue: string;
  city: string;
  state: string;
  lat?: number;
  long?: number;
}

export function formatLocation({ venue, city, state }: EventLocation): string {
  return `${venue}, ${city}, ${state}`;
}

export function formatCityState({ city, state }: EventLocation): string {
  return `${city}, ${state}`;
}

export function mapsUrl({ venue, city, state }: EventLocation): string {
  const query = formatLocation({ venue, city, state });
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
