import type { Schema, Struct } from "@strapi/strapi";

export interface CallToActionCallToAction extends Struct.ComponentSchema {
  collectionName: "components_call_to_action_call_to_actions";
  info: {
    displayName: "Call to action";
  };
  attributes: {
    button_label_en: Schema.Attribute.String;
    button_label_th: Schema.Attribute.String & Schema.Attribute.Required;
    link_to: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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
      "call-to-action.call-to-action": CallToActionCallToAction;
      "seo.seo": SeoSeo;
    }
  }
}
