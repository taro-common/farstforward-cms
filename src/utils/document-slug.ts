type TitleFields = {
  title?: string | null;
  title_th?: string | null;
  title_en?: string | null;
};

export function getSlugSource(data: TitleFields): string {
  return data.title_en?.trim() || data.title?.trim() || "";
}

/** Matches strapi-plugin-auto-locales-slug admin slugify behavior. */
export function slugifyDocumentTitle(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function buildSlugFromTitles(data: TitleFields): string | undefined {
  const source = getSlugSource(data);
  if (!source) {
    return undefined;
  }

  const slug = slugifyDocumentTitle(source);
  return slug || undefined;
}
