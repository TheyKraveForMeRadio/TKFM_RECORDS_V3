import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing body" })
      };
    }

    const { email } = JSON.parse(event.body);

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("LOGIN CODE:", code);

    await resend.emails.send({
      from: "onboarding@resend.dev",  // 🔥 CHANGE THIS LINE
      to: email,
      subject: "Your TKFM Login Code",
      html: `<h1>${code}</h1>`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
