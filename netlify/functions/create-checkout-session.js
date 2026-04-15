import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { artistName, email, trackTitle, plan } = JSON.parse(event.body);

    let priceData;

    // 💰 PLAN SWITCH
    if (plan === "priority") {
      priceData = {
        currency: 'usd',
        product_data: {
          name: '🔥 Priority Submission',
          description: `${artistName} - ${trackTitle}`
        },
        unit_amount: 5000
      };
    } else if (plan === "subscription") {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'TKFM Unlimited Submissions'
            },
            recurring: { interval: 'month' },
            unit_amount: 2900
          },
          quantity: 1
        }],
        success_url: `${process.env.URL}/success.html`,
        cancel_url: `${process.env.URL}/submit.html`,
        metadata: { artistName, email }
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ url: session.url })
      };
    } else {
      // standard
      priceData = {
        currency: 'usd',
        product_data: {
          name: 'TKFM Standard Submission',
          description: `${artistName} - ${trackTitle}`
        },
        unit_amount: 1500
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price_data: priceData, quantity: 1 }],
      success_url: `${process.env.URL}/success.html`,
      cancel_url: `${process.env.URL}/submit.html`,
      metadata: { artistName, email, trackTitle, plan }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
