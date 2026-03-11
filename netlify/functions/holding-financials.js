import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('*');

  let consolidated = {
    totalRevenue:0,
    totalEscrow:0,
    totalPayouts:0,
    entityBreakdown:[]
  };

  for (const entity of entities || []) {

    const { data: ledger } = await supabase
      .from('platform_ledger')
      .select('amount')
      .eq('entity_id', entity.id)
      .eq('event_type','invoice.paid');

    const { data: escrow } = await supabase
      .from('tax_escrow')
      .select('reserved_amount')
      .eq('entity_id', entity.id);

    const { data: payouts } = await supabase
      .from('payout_line_items')
      .select('amount')
      .eq('entity_id', entity.id);

    const revenue =
      (ledger||[]).reduce((s,r)=>s+Number(r.amount||0),0);

    const escrowTotal =
      (escrow||[]).reduce((s,e)=>s+Number(e.reserved_amount||0),0);

    const payoutTotal =
      (payouts||[]).reduce((s,p)=>s+Number(p.amount||0),0);

    consolidated.totalRevenue += revenue;
    consolidated.totalEscrow += escrowTotal;
    consolidated.totalPayouts += payoutTotal;

    consolidated.entityBreakdown.push({
      entity:entity.slug,
      revenue,
      escrow:escrowTotal,
      payouts:payoutTotal
    });
  }

  consolidated.netIncome =
    consolidated.totalRevenue - consolidated.totalPayouts;

  return {
    statusCode:200,
    body:JSON.stringify(consolidated)
  };
}
