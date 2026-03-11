import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entity_risk_scores')
    .select('*');

  for (const entity of entities) {

    const volatility =
      Math.abs(entity.risk_score - (entity.previous_risk_score || 0));

    const confidence =
      Math.min(1, 0.5 + (volatility / 100));

    await supabase
      .from('entity_risk_scores')
      .update({
        risk_confidence: confidence,
        previous_risk_score: entity.risk_score
      })
      .eq('entity_id', entity.entity_id);

  }

  return {
    statusCode:200,
    body:JSON.stringify({ success:true })
  };
}
