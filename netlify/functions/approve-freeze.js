import { supabase } from './supabase.js';

export async function handler(event) {

  const { entity_id, approved_by } = JSON.parse(event.body || '{}');

  if (!entity_id) {
    return { statusCode:400, body:"entity_id required" };
  }

  await supabase.from('freeze_approvals')
    .update({
      status:'approved',
      approved_by,
      approved_at:new Date().toISOString()
    })
    .eq('entity_id', entity_id)
    .eq('status','pending');

  await supabase.from('entity_risk_scores')
    .update({
      payout_frozen:true,
      freeze_triggered_at:new Date().toISOString()
    })
    .eq('entity_id', entity_id);

  return {
    statusCode:200,
    body:JSON.stringify({ success:true })
  };
}
