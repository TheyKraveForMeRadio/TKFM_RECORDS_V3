import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('entity_risk_scores')
    .select('entity_id,risk_score,freeze_active');

  const heatmap = data.map(e=>({
    entity:e.entity_id,
    intensity:e.risk_score,
    frozen:e.freeze_active
  }));

  return {
    statusCode:200,
    body:JSON.stringify(heatmap)
  };
}
