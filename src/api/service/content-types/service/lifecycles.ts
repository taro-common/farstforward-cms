import { isActionComponentSet } from "../../../../utils/call-to-action";
import { buildSlugFromTitles, getSlugSource } from "../../../../utils/document-slug";

type ServiceData = {
  slug?: string;
  title?: string;
  title_th?: string;
  title_en?: string;
  has_action_button?: boolean;
  action?: {
    button_label_th?: string | null;
    button_label_en?: string | null;
    link_to?: string | null;
  } | null;
};

function applySlugAndTitle(data: ServiceData) {
  const source = getSlugSource(data);

  if (source) {
    data.title = source;

    if (!data.slug?.trim()) {
      const slug = buildSlugFromTitles(data);
      if (slug) {
        data.slug = slug;
      }
    }
  }
}

function applyHasActionButton(data: ServiceData) {
  data.has_action_button = isActionComponentSet(data.action);
}

export default {
  beforeCreate(event: { params: { data: ServiceData } }) {
    applySlugAndTitle(event.params.data);
    applyHasActionButton(event.params.data);
  },
  beforeUpdate(event: { params: { data: ServiceData } }) {
    applySlugAndTitle(event.params.data);
    applyHasActionButton(event.params.data);
  },
};
