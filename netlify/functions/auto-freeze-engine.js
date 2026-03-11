import { supabase } from './supabase.js';

const FREEZE_THRESHOLD = 70;

export async function handler() {

  const { data: risks } = await supabase
    .from('entity_risk_scores')
    .select('*');

  for (let risk of risks) {

    if (risk.risk_score >= FREEZE_THRESHOLD && !risk.freeze_active) {

      await supabase.from('entity_risk_scores')
        .update({
          freeze_active:true,
          freeze_triggered_at:new Date().toISOString()
        })
        .eq('entity_id', risk.entity_id);

      await supabase.from('security_events')
        .insert({
          event_type:'AUTO_PAYOUT_FREEZE',
          severity:'CRITICAL',
          metadata:{
            entity_id:risk.entity_id,
            risk_score:risk.risk_score
          }
        });

    }
  }

  return {
    statusCode:200,
    body:JSON.stringify({ evaluated:risks.length })
  };
}
