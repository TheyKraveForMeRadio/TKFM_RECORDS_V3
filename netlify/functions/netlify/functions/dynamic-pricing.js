import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  const { data: artists } = await supabase.from('tkfm_artists').select('*');

  for (const a of artists) {
    if (a.score >= 300 && !a.price_locked) {
      await supabase.from('tkfm_artists')
        .update({ price_locked: true })
        .eq('email', a.email);
    }
  }

  return { statusCode: 200, body: 'pricing adjusted' };
}
