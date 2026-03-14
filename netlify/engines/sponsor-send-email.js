import bus from "./_event-bus.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  if (event.headers['x-owner-key'] !== process.env.TKFM_OWNER_KEY) {
    return { statusCode:403, body:'Forbidden' };
  }

  const { email, audio_url, request_id } = JSON.parse(event.body);

  if (!email || !audio_url) {
    return { statusCode:400, body:'Missing data' };
  }

  await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: email,
    subject: "🎙️ Your TKFM Sponsor Read Is Ready",
    html: `
      <h2>Your Sponsor Read Is Complete</h2>
      <p>Thanks for working with <b>They Krave For Me Radio</b>.</p>
      <p><a href="${audio_url}" target="_blank">🎧 Click here to listen & download</a></p>
      <p>Request ID: <b>${request_id}</b></p>
      <hr/>
      <small>TKFM Radio — Independent Artist Power Station</small>
    `
  });

  return {
    statusCode:200,
    body: JSON.stringify({ ok:true })
  };
};
