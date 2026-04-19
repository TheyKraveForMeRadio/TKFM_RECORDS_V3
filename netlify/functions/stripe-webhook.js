const Stripe = require('stripe');
const { supabase } = require('./_supabase');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const sig = event.headers['stripe-signature'];

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );

    if (stripeEvent.type === 'checkout.session.completed') {

      const session = stripeEvent.data.object;

      const email = session.customer_email;

      // DEFAULT CREDIT MAP
      const creditMap = {
        "drop_pack_10": 10,
        "drop_pack_25": 25,
        "drop_pack_100": 100
      };

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const priceId = lineItems.data[0].price.lookup_key;

      const creditsToAdd = creditMap[priceId] || 0;

      // GET USER
      const { data: user } = await supabase
        .from('tkfm_artists')
        .select('*')
        .eq('email', email)
        .single();

      let currentCredits = user?.credits || {};

      if (typeof currentCredits !== "object") currentCredits = {};

      currentCredits.ai_drops = (currentCredits.ai_drops || 0) + creditsToAdd;

      await supabase
        .from('tkfm_artists')
        .update({ credits: currentCredits })
        .eq('email', email);
    }

    return { statusCode: 200, body: "ok" };

  } catch (err) {
    console.error(err);
    return { statusCode: 400, body: err.message };
  }
};
