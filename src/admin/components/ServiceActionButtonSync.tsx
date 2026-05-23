import { useEffect } from "react";
import { unstable_useContentManagerContext } from "@strapi/strapi/admin";

import { isActionComponentSet } from "../../utils/call-to-action";

const SERVICE_MODEL = "api::service.service";

type ContentManagerForm = {
  values: {
    has_action_button?: boolean;
    action?: {
      button_label_th?: string;
      button_label_en?: string;
      link_to?: string;
    } | null;
  };
  onChange: (event: {
    target: { name: string; value: boolean | string };
  }) => void;
};

/** Syncs has_action_button when the action component is filled or cleared. */
export function ServiceActionButtonSync() {
  const { model, form } = unstable_useContentManagerContext();
  const { values, onChange } = form as ContentManagerForm;

  const action = values.action;

  useEffect(() => {
    if (model !== SERVICE_MODEL) {
      return;
    }

    const hasAction = isActionComponentSet(action);

    if (values.has_action_button === hasAction) {
      return;
    }

    onChange({ target: { name: "has_action_button", value: hasAction } });
  }, [
    model,
    action,
    action?.button_label_th,
    action?.button_label_en,
    action?.link_to,
    values.has_action_button,
    onChange,
  ]);

  return null;
}
