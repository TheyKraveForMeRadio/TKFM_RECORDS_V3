import { getTemplate } from "./email-templates.js";

export async function handler(event) {
  const { to, type, data } = JSON.parse(event.body);

  const tpl = getTemplate(type, data);
  if (!tpl) return { statusCode: 400, body: "Invalid template" };

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "TKFM Label <noreply@tkfmrecords.com>",
      to,
      subject: tpl.subject,
      html: `<p>${tpl.body}</p>`
    })
  });

  return { statusCode: 200, body: "sent" };
}
