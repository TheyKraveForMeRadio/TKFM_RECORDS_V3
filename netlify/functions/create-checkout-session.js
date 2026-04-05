const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { lookup_key, user_id } = JSON.parse(event.body);

  try {
    const prices = await stripe.prices.list({
      lookup_keys: [lookup_key],
      expand: ['data.product']
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'https://your-site.com/success.html?session_id={CHECKOUT_SESSION_ID}&user_id=' + user_id,
      cancel_url: 'https://your-site.com/cancel.html'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
