const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
  try {
    const sig = event.headers['stripe-signature'];

    let stripeEvent;

    // DEV MODE (no signature check)
    if (process.env.NODE_ENV !== 'production') {
      stripeEvent = JSON.parse(event.body);
    } else {
      stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    }

    console.log("EVENT:", stripeEvent.type);

    // ✅ HANDLE PAYMENT SUCCESS
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;

      const email = session.customer_details.email;

      // 💰 CREDIT PACK LOGIC
      let creditsToAdd = 0;

      const amount = session.amount_total;

      if (amount === 1000) creditsToAdd = 10;     // $10
      if (amount === 2500) creditsToAdd = 25;     // $25
      if (amount === 10000) creditsToAdd = 100;   // $100

      console.log("EMAIL:", email);
      console.log("CREDITS TO ADD:", creditsToAdd);

      if (creditsToAdd > 0) {
        const { data, error } = await supabase.rpc('increment_credits', {
          user_email: email,
          amount: creditsToAdd
        });

        if (error) {
          console.error("SUPABASE ERROR:", error);
        } else {
          console.log("✅ CREDITS ADDED");
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };

  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err.message);
    return {
      statusCode: 400,
      body: err.message,
    };
  }
};
