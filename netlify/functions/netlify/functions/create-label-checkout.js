const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.handler = async function(event, context) {
  try {
    const { artistId, plan } = JSON.parse(event.body || '{}');
    if (!artistId || !plan) return { statusCode: 400, body: 'Missing artistId or plan' };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: plan, quantity: 1 }],
      metadata: { artistId },
      success_url: `${process.env.SITE_URL}/artist-dashboard.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/artist-dashboard.html?status=cancelled`
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: err.message };
  }
};
