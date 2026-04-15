import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
  try {
    const { artistName, email, trackTitle } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'TKFM Artist Submission',
            description: `${artistName} - ${trackTitle}`
          },
          unit_amount: 1500 // $15
        },
        quantity: 1
      }],
      success_url: `${process.env.URL}/success.html`,
      cancel_url: `${process.env.URL}/submit.html`,
      metadata: {
        artistName,
        email,
        trackTitle
      }
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
