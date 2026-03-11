import { supabase } from './supabase.js';

export async function handler() {

  const { data: freezeEvents } = await supabase
    .from('security_events')
    .select('*')
    .eq('event_type','AUTO_PAYOUT_FREEZE');

  const multiplier =
    1 + (freezeEvents.length / 100);

  const { data: risks } = await supabase
    .from('entity_risk_scores')
    .select('*');

  for (let r of risks) {

    const adjusted =
      Math.min(100, r.risk_score * multiplier);

    await supabase.from('entity_risk_scores')
      .update({ risk_score:adjusted })
      .eq('entity_id', r.entity_id);

  }

  return {
    statusCode:200,
    body:JSON.stringify({
      multiplier,
      updated: risks.length
    })
  };
}
