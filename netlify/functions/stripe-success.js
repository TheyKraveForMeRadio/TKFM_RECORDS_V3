import Stripe from "stripe";
import fetch from "node-fetch";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { session_id } = event.queryStringParameters;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    const { artistName, email, trackTitle } = session.metadata;

    // 🔥 EMAIL CONFIRMATION
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "TKFM <no-reply@send.mail.tkfmrecords.com>",
        to: [email],
        subject: "🔥 Submission Confirmed",
        html: `
          <h1>Payment Received</h1>
          <p>Artist: ${artistName}</p>
          <p>Track: ${trackTitle}</p>
          <p>Your track is now in review.</p>
        `
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
