import type { Schema, Struct } from "@strapi/strapi";

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: "components_seo_seos";
  info: {
    displayName: "SEO";
    icon: "earth";
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaImage: Schema.Attribute.Media<"images" | "files" | "videos" | "audios">;
    metaTitle: Schema.Attribute.String;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "seo.seo": SeoSeo;
    }
  }
}
