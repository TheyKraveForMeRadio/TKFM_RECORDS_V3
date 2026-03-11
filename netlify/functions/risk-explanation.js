import { supabase } from './supabase.js';

export async function handler(event) {

  const entity_id = event.queryStringParameters?.entity_id;

  const { data } = await supabase
    .from('entity_risk_scores')
    .select('*')
    .eq('entity_id', entity_id)
    .single();

  const explanation = {
    risk_score: data.risk_score,
    confidence: data.risk_confidence,
    factors: {
      failed_webhooks: data.failed_webhooks,
      chargebacks: data.chargeback_count,
      payout_spikes: data.large_payout_spike
    },
    freeze_status: data.payout_frozen
  };

  return {
    statusCode:200,
    body:JSON.stringify(explanation)
  };
}
