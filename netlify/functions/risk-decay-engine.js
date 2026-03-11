import { supabase } from './supabase.js';

const DECAY_PERCENT = 0.10;

export async function handler() {

  const { data: risks } = await supabase
    .from('entity_risk_scores')
    .select('*');

  for (let risk of risks) {

    if (!risk.risk_score || risk.risk_score <= 0) continue;

    const newScore = Math.max(
      0,
      risk.risk_score - (risk.risk_score * DECAY_PERCENT)
    );

    await supabase.from('entity_risk_scores')
      .update({
        risk_score: newScore,
        last_decay_at: new Date().toISOString()
      })
      .eq('entity_id', risk.entity_id);

  }

  return {
    statusCode:200,
    body:JSON.stringify({ decayed: risks.length })
  };
}
