export type CallToActionComponent = {
  button_label_th?: string | null;
  button_label_en?: string | null;
  link_to?: string | null;
};

export function isActionComponentSet(
  action?: CallToActionComponent | null,
): boolean {
  if (!action || typeof action !== "object") {
    return false;
  }

  return Boolean(
    action.button_label_th?.trim() ||
      action.button_label_en?.trim() ||
      action.link_to?.trim(),
  );
}
