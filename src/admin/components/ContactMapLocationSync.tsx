import { useEffect } from "react";
import { getFetchClient, unstable_useContentManagerContext } from "@strapi/strapi/admin";

import {
  isShortGoogleMapUrl,
  parseGoogleMapUrl,
  type MapCoordinates,
} from "../../utils/google-map-url";

const CONTACT_MODEL = "api::contact.contact";

type ContentManagerForm = {
  values: {
    google_map_url?: string;
    location_lat?: string;
    location_long?: string;
  };
  onChange: (event: { target: { name: string; value: string } }) => void;
};

async function resolveCoordinates(url: string): Promise<MapCoordinates | null> {
  const direct = parseGoogleMapUrl(url);
  if (direct) {
    return direct;
  }

  if (!isShortGoogleMapUrl(url)) {
    return null;
  }

  try {
    const { post } = getFetchClient();
    const response = await post("/contact/parse-map-url", { url });
    return response.data?.data ?? null;
  } catch {
    return null;
  }
}

/** Fills location_lat and location_long when google_map_url is set. */
export function ContactMapLocationSync() {
  const { model, form } = unstable_useContentManagerContext();
  const { values, onChange } = form as ContentManagerForm;

  useEffect(() => {
    if (model !== CONTACT_MODEL) {
      return;
    }

    const mapUrl = values.google_map_url?.trim() ?? "";
    if (!mapUrl) {
      return;
    }

    let cancelled = false;

    const sync = async () => {
      const coords = await resolveCoordinates(mapUrl);
      if (cancelled || !coords) {
        return;
      }

      if (values.location_lat !== coords.lat) {
        onChange({ target: { name: "location_lat", value: coords.lat } });
      }

      if (values.location_long !== coords.lng) {
        onChange({ target: { name: "location_long", value: coords.lng } });
      }
    };

    const timer = window.setTimeout(sync, 400);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [model, values.google_map_url, onChange]);

  return null;
}
