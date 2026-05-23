import {
  applyMapCoordinates,
  coordinatesFromGoogleMapUrl,
} from "../../../../utils/google-map-url";

type ContactData = {
  google_map_url?: string | null;
  location_lat?: string | null;
  location_long?: string | null;
};

async function applyLocationFromMapUrl(data: ContactData) {
  const mapUrl = data.google_map_url?.trim();
  if (!mapUrl) {
    return;
  }

  const coords = await coordinatesFromGoogleMapUrl(mapUrl);
  if (!coords) {
    return;
  }

  applyMapCoordinates(data, coords);
}

export default {
  async beforeCreate(event: { params: { data: ContactData } }) {
    await applyLocationFromMapUrl(event.params.data);
  },
  async beforeUpdate(event: { params: { data: ContactData } }) {
    await applyLocationFromMapUrl(event.params.data);
  },
};
