import { buildSlugFromTitles, getSlugSource } from "../../../../utils/document-slug";

type ProjectData = {
  slug?: string;
  title?: string;
  title_th?: string;
  title_en?: string;
};

function applySlugAndTitle(data: ProjectData) {
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

export default {
  beforeCreate(event: { params: { data: ProjectData } }) {
    applySlugAndTitle(event.params.data);
  },
  beforeUpdate(event: { params: { data: ProjectData } }) {
    applySlugAndTitle(event.params.data);
  },
};
