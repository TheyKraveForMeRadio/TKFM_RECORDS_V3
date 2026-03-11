import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function sendTransfer({
  provider,
  amount,
  destination
}) {

  if (provider === 'stripe') {

    return await stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      destination
    });

  }

  if (provider === 'unit') {
    // Placeholder for Unit.co API
    return { simulated:true, provider:'unit' };
  }

  if (provider === 'mercury') {
    // Placeholder for Mercury API
    return { simulated:true, provider:'mercury' };
  }

  throw new Error("Unsupported bank provider");
}
