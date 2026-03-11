import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entity_risk_scores')
    .select('*')
    .eq('payout_frozen', true);

  for (const entity of entities) {

    const freezeTime = new Date(entity.freeze_triggered_at);
    const hoursFrozen = (new Date() - freezeTime) / 3600000;

    if (entity.risk_score < 40 && hoursFrozen > 48) {

      await supabase
        .from('entity_risk_scores')
        .update({
          payout_frozen:false,
          freeze_triggered_at:null
        })
        .eq('entity_id', entity.entity_id);

      await supabase
        .from('security_events')
        .insert({
          event_type:'AUTO_UNFREEZE',
          actor:entity.entity_id
        });
    }

  }

  return { statusCode:200, body:"ok" };
}
