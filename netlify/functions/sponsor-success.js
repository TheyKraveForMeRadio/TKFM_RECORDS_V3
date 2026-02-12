const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { session_id } = JSON.parse(event.body || '{}');
    if (!session_id) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'No session_id provided' }) };
    }

    // Retrieve Stripe Checkout Session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== 'paid') {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Payment not completed' }) };
    }

    const customerId = session.customer;
    const packKey = session.metadata?.packKey || null;

    if (!customerId || !packKey) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing customer or pack info' }) };
    }

    // Award credits via internal API
    const res = await fetch(`${process.env.BASE_URL}/.netlify/functions/sponsor-credits-add`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ customerId, packKey })
    });

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, credits: data.credits || 0 })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
