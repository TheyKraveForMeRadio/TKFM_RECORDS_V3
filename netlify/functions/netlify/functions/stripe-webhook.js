export async function handler(event, context) {
  // parse Stripe webhook and update tkfm_artists.subscription_active
  return { statusCode: 200, body: 'ok' };
}
