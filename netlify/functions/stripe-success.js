import Stripe from "stripe";
import fetch from "node-fetch";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { session_id } = event.queryStringParameters;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const { artistName, email, trackTitle, plan } = session.metadata;

    // 🔥 SAVE TO SUPABASE
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions`, {
      method: "POST",
      headers: {
        "apikey": process.env.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        artist_name: artistName,
        email,
        track_title: trackTitle,
        plan
      })
    });

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
          <p>${artistName} - ${trackTitle}</p>
          <p>Status: Pending Review</p>
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
