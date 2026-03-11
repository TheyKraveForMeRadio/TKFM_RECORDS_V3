import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  // --- STRIPE DATA ---
  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  let MRR = 0;

  subs.data.forEach(s=>{
    const price = s.items.data[0]?.price;
    if(!price) return;

    let amount = price.unit_amount / 100;

    if(price.recurring.interval === 'year')
      amount = amount / 12;

    MRR += amount;
  });

  const ARR = MRR * 12;

  // --- SUPABASE DATA ---
  const { data: revenue } =
    await supabase.from('revenue_events').select('*');

  const { data: expenses } =
    await supabase.from('expenses').select('*');

  const totalRevenue =
    revenue?.reduce((s,r)=>s+(r.amount||0),0) || 0;

  const totalExpenses =
    expenses?.reduce((s,e)=>s+(e.amount||0),0) || 0;

  const grossMargin =
    totalRevenue > 0
      ? ((totalRevenue-totalExpenses)/totalRevenue)*100
      : 0;

  const monthlyBurn =
    totalExpenses;

  const runwayMonths =
    monthlyBurn > 0
      ? (totalRevenue/monthlyBurn)
      : 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      MRR,
      ARR,
      totalRevenue,
      totalExpenses,
      grossMargin,
      monthlyBurn,
      runwayMonths
    })
  };
}
