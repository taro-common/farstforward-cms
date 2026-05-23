/**
 * contact controller
 */

import { factories } from "@strapi/strapi";

import { coordinatesFromGoogleMapUrl } from "../../../utils/google-map-url";

export default factories.createCoreController(
  "api::contact.contact",
  () => ({
    async parseMapUrl(ctx) {
      const { url } = ctx.request.body as { url?: string };

      if (!url?.trim()) {
        return ctx.badRequest("url is required");
      }

      const coords = await coordinatesFromGoogleMapUrl(url.trim());
      ctx.body = { data: coords };
    },
  }),
);
