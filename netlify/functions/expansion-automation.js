import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const { data: usage } = await supabase
    .from('usage_metrics')
    .select('*');

  const upgrades = [];

  for(const u of usage||[]) {

    if(u.billable_units > 150) {

      upgrades.push({
        entity:u.entity_slug,
        recommendation:"Enterprise Upgrade"
      });
    }
  }

  return {
    statusCode:200,
    body:JSON.stringify(upgrades)
  };
}
