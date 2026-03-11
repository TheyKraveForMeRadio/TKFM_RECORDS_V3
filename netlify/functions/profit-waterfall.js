import { supabase } from './supabase.js';

export async function handler(event) {

  const entityId = event.queryStringParameters.entity_id;

  if (!entityId) {
    return { statusCode:400, body:'entity_id required' };
  }

  const { data: revenue } = await supabase
    .from('platform_ledger')
    .select('amount')
    .eq('entity_id', entityId)
    .eq('event_type','invoice.paid');

  const totalRevenue =
    (revenue||[]).reduce((s,r)=>s+Number(r.amount||0),0);

  const platformFee = totalRevenue * 0.05;
  const escrowReserve = totalRevenue * 0.25;
  const operatingCost = totalRevenue * 0.15;

  const netToEntity =
    totalRevenue - platformFee - escrowReserve - operatingCost;

  return {
    statusCode:200,
    body:JSON.stringify({
      totalRevenue,
      platformFee,
      escrowReserve,
      operatingCost,
      netToEntity
    })
  };
}
