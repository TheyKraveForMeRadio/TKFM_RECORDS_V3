import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entity_risk_scores')
    .select('*');

  const frozen = entities.filter(e => e.payout_frozen === true).length;
  const highRisk = entities.filter(e => e.risk_score > 70).length;

  const summary = {
    total_entities: entities.length,
    frozen_entities: frozen,
    high_risk_entities: highRisk,
    generated_at: new Date().toISOString()
  };

  return {
    statusCode:200,
    body:JSON.stringify(summary)
  };
}
