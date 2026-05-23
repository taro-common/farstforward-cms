import { useEffect } from "react";
import { unstable_useContentManagerContext } from "@strapi/strapi/admin";

const SLUG_CONTENT_TYPES = new Set([
  "api::project.project",
  "api::service.service",
]);

/** Keeps the hidden `title` field in sync from title_en for auto-locales-slug. */
type ContentManagerForm = {
  values: {
    title?: string;
    title_en?: string;
  };
  onChange: (event: { target: { name: string; value: string } }) => void;
};

export function SlugTitleSync() {
  const { model, form } = unstable_useContentManagerContext();
  const { values, onChange } = form as ContentManagerForm;

  useEffect(() => {
    if (!SLUG_CONTENT_TYPES.has(model)) {
      return;
    }

    const syncedTitle = values.title_en?.trim?.() ?? "";

    if ((values.title ?? "") === syncedTitle) {
      return;
    }

    onChange({ target: { name: "title", value: syncedTitle } });
  }, [model, values.title_en, values.title, onChange]);

  return null;
}
