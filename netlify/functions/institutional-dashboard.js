import Stripe from 'stripe';
import { supabase } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  /* ======================
     STRIPE METRICS
  ====================== */

  const activeSubs = await stripe.subscriptions.list({
    status: 'active',
    limit: 100
  });

  const canceledSubs = await stripe.subscriptions.list({
    status: 'canceled',
    limit: 100
  });

  const MRR = activeSubs.data.reduce((sum, s) =>
    sum + (s.items.data[0]?.price.unit_amount || 0), 0) / 100;

  const ARR = MRR * 12;

  const churnRate =
    activeSubs.data.length > 0
      ? (canceledSubs.data.length /
        (activeSubs.data.length + canceledSubs.data.length)) * 100
      : 0;

  const ARPU =
    activeSubs.data.length > 0
      ? MRR / activeSubs.data.length
      : 0;

  const LTV =
    churnRate > 0
      ? ARPU / (churnRate / 100)
      : 0;

  const CAC = 250; // placeholder until expense tracking integrated

  /* ======================
     SUPABASE FINANCIAL DATA
  ====================== */

  const { data: payouts } = await supabase
    .from('payout_line_items')
    .select('amount');

  const totalPayouts =
    (payouts || [])
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const { data: escrow } = await supabase
    .from('tax_escrow')
    .select('reserved_amount');

  const escrowReserve =
    (escrow || [])
      .reduce((sum, e) => sum + Number(e.reserved_amount || 0), 0);

  const netIncome = MRR - totalPayouts;

  /* ======================
     GROWTH RATE
  ====================== */

  const { data: ledger } = await supabase
    .from('platform_ledger')
    .select('amount, created_at')
    .eq('event_type', 'invoice.paid')
    .order('created_at', { ascending: true });

  let growthRate = 0;

  if (ledger && ledger.length > 2) {
    const mid = Math.floor(ledger.length / 2);

    const firstHalf =
      ledger.slice(0, mid)
        .reduce((sum, r) => sum + Number(r.amount || 0), 0);

    const secondHalf =
      ledger.slice(mid)
        .reduce((sum, r) => sum + Number(r.amount || 0), 0);

    if (firstHalf > 0) {
      growthRate =
        ((secondHalf - firstHalf) / firstHalf) * 100;
    }
  }

  /* ======================
     VARIABLE BURN + RUNWAY
  ====================== */

  const baseBurn = 5000;
  const variableBurn = MRR * 0.2;
  const monthlyBurn = baseBurn + variableBurn;

  const runwayMonths =
    monthlyBurn > 0
      ? ARR / monthlyBurn
      : 0;

  /* ======================
     RETURN BOARD METRICS
  ====================== */

  return {
    statusCode: 200,
    body: JSON.stringify({
      MRR,
      ARR,
      churnRate: churnRate.toFixed(2),
      ARPU,
      LTV,
      CAC,
      LTV_to_CAC: CAC > 0 ? (LTV / CAC).toFixed(2) : null,
      growthRate: growthRate.toFixed(2),
      totalPayouts,
      escrowReserve,
      netIncome,
      monthlyBurn,
      runwayMonths: runwayMonths.toFixed(2)
    })
  };
}
