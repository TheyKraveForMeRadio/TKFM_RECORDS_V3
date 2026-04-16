import Stripe from "stripe";
import fetch from "node-fetch";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { email } = JSON.parse(event.body);

    const account = await stripe.accounts.create({
      type: 'express'
    });

    // 🔥 SAVE ACCOUNT ID
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/referral_stats`, {
      method: "PATCH",
      headers: {
        "apikey": process.env.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stripe_account_id: account.id
      })
    });

    const link = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: process.env.URL + '/dashboard.html',
      return_url: process.env.URL + '/dashboard.html',
      type: 'account_onboarding'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: link.url })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
