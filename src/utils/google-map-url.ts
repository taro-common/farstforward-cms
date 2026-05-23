export type MapCoordinates = {
  lat: string;
  lng: string;
};

const COORD_PATTERNS: Array<(url: string) => MapCoordinates | null> = [
  (url) => {
    const match = url.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
    if (!match) {
      return null;
    }

    return { lat: match[1], lng: match[2] };
  },
  (url) => {
    const match = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
    if (!match) {
      return null;
    }

    return { lat: match[1], lng: match[2] };
  },
  (url) => {
    const match = url.match(
      /[?&](?:q|query|ll|center)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    );
    if (!match) {
      return null;
    }

    return { lat: match[1], lng: match[2] };
  },
];

export function parseGoogleMapUrl(url: string): MapCoordinates | null {
  const trimmed = url.trim();
  if (!trimmed) {
    return null;
  }

  for (const pattern of COORD_PATTERNS) {
    const coords = pattern(trimmed);
    if (coords) {
      return coords;
    }
  }

  return null;
}

export function isShortGoogleMapUrl(url: string): boolean {
  return /maps\.app\.goo\.gl|goo\.gl\/maps/i.test(url);
}

function isGoogleMapUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return /(^|\.)google\.(com|[a-z]{2,3})$/i.test(hostname) || /goo\.gl$/i.test(hostname);
  } catch {
    return false;
  }
}

export async function resolveGoogleMapUrl(url: string): Promise<string> {
  if (!isShortGoogleMapUrl(url) || !isGoogleMapUrl(url)) {
    return url;
  }

  try {
    const response = await fetch(url, { redirect: "follow" });
    return response.url || url;
  } catch {
    return url;
  }
}

export async function coordinatesFromGoogleMapUrl(
  url: string,
): Promise<MapCoordinates | null> {
  if (!isGoogleMapUrl(url)) {
    return null;
  }

  const direct = parseGoogleMapUrl(url);
  if (direct) {
    return direct;
  }

  const resolved = await resolveGoogleMapUrl(url);
  if (resolved === url) {
    return null;
  }

  return parseGoogleMapUrl(resolved);
}

export function applyMapCoordinates(
  data: {
    google_map_url?: string | null;
    location_lat?: string | null;
    location_long?: string | null;
  },
  coords: MapCoordinates,
) {
  data.location_lat = coords.lat;
  data.location_long = coords.lng;
}
