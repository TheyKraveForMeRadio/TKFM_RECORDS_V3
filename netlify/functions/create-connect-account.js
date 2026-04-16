import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const account = await stripe.accounts.create({
      type: 'express'
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
