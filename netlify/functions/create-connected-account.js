import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const { email, entity_id } = JSON.parse(event.body || '{}');

  if (!email) {
    return { statusCode:400, body:"Email required" };
  }

  const account = await stripe.accounts.create({
    type: 'express',
    email,
    capabilities: {
      transfers: { requested: true },
      treasury: { requested: true },
      card_issuing: { requested: true }
    }
  });

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: process.env.URL + "/onboarding-refresh",
    return_url: process.env.URL + "/onboarding-complete",
    type: "account_onboarding"
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      account_id: account.id,
      onboarding_url: accountLink.url
    })
  };
}
