import { supabase } from './supabase.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const { data: escrow } = await supabase
    .from('tax_escrow')
    .select('reserved_amount');

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const escrowTotal =
    (escrow||[]).reduce((s,e)=>s+Number(e.reserved_amount||0),0);

  const liabilities =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const escrowCoverage =
    liabilities > 0 ? (escrowTotal/liabilities)*100 : 0;

  let complianceScore = 0;

  if (escrowCoverage >= 100) complianceScore += 40;
  if (subs.data.length > 10) complianceScore += 20;
  if (escrowTotal > 0) complianceScore += 20;

  return {
    statusCode:200,
    body:JSON.stringify({
      escrowCoverage:escrowCoverage.toFixed(2),
      complianceScore,
      subscriberCount:subs.data.length,
      auditReady:complianceScore >= 60
    })
  };
}
