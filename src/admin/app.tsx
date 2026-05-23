import type { StrapiApp } from "@strapi/strapi/admin";

import "./app.css";
import { ContactMapLocationSync } from "./components/ContactMapLocationSync";
import { ServiceActionButtonSync } from "./components/ServiceActionButtonSync";
import { SlugTitleSync } from "./components/SlugTitleSync";

export default {
  config: {},
  bootstrap(app: StrapiApp) {
    const contentManager = app.getPlugin("content-manager");

    contentManager.injectComponent("editView", "right-links", {
      name: "slug-title-sync",
      Component: SlugTitleSync,
    });

    contentManager.injectComponent("editView", "right-links", {
      name: "contact-map-location-sync",
      Component: ContactMapLocationSync,
    });

    contentManager.injectComponent("editView", "right-links", {
      name: "service-action-button-sync",
      Component: ServiceActionButtonSync,
    });
  },
};
