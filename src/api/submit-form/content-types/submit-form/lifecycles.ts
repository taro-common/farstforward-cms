type SubmitFormEntry = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  service?: string | null;
  message?: string | null;
};

function parseEmails(value?: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email.includes("@"));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function displayValue(value?: string | null): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "-";
}

function htmlRow(label: string, value?: string | null): string {
  return `<tr>
    <td style="padding:8px 12px;font-weight:600;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:8px 12px">${escapeHtml(displayValue(value)).replace(/\n/g, "<br>")}</td>
  </tr>`;
}

async function sendSubmitFormNotification(entry: SubmitFormEntry) {
  const contact = await strapi.documents("api::contact.contact").findFirst({
    fields: ["email"],
  });
  const recipients = parseEmails(contact?.email);

  if (recipients.length === 0) {
    strapi.log.warn(
      "Submit form notification skipped: no email in api::contact.contact",
    );
    return;
  }

  const name = displayValue(entry.name);
  const replyTo = entry.email?.trim() || undefined;

  try {
    await strapi.plugin("email").service("email").send({
      to: recipients,
      replyTo,
      subject: `ข้อความใหม่จากเว็บไซต์ — ${name}`,
      text: [
        "มีข้อความใหม่จากแบบฟอร์มติดต่อ",
        "",
        `ชื่อ: ${displayValue(entry.name)}`,
        `อีเมล: ${displayValue(entry.email)}`,
        `โทร: ${displayValue(entry.phone)}`,
        `บริการ: ${displayValue(entry.service)}`,
        `ข้อความ: ${displayValue(entry.message)}`,
      ].join("\n"),
      html: `<p>มีข้อความใหม่จากแบบฟอร์มติดต่อ</p>
<table style="border-collapse:collapse">${htmlRow("ชื่อ", entry.name)}${htmlRow("อีเมล", entry.email)}${htmlRow("โทร", entry.phone)}${htmlRow("บริการ", entry.service)}${htmlRow("ข้อความ", entry.message)}</table>`,
    });
  } catch (error) {
    strapi.log.error("Failed to send submit-form notification email", error);
  }
}

export default {
  async afterCreate(event: { result: SubmitFormEntry }) {
    await sendSubmitFormNotification(event.result);
  },
};
