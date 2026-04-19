const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { email, lookup_key } = JSON.parse(event.body);

    if (!email || !lookup_key) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing email or lookup_key" })
      };
    }

    const prices = await stripe.prices.list({
      lookup_keys: [lookup_key],
      expand: ['data.product']
    });

    if (!prices.data.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid lookup_key" })
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [{
        price: prices.data[0].id,
        quantity: 1
      }],
      success_url: 'https://tkfmrecords.netlify.app/success.html',
      cancel_url: 'https://tkfmrecords.netlify.app/cancel.html'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
