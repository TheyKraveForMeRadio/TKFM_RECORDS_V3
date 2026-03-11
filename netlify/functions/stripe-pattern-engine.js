import { supabase } from './supabase.js';

export async function handler() {

  const oneHourAgo = new Date(Date.now() - 60*60*1000);

  const { data: events } = await supabase
    .from('stripe_webhook_events')
    .select('*')
    .gte('received_at', oneHourAgo.toISOString());

  const entityCounts = {};

  for (let e of events) {
    const entityId = e.entity_id;
    if (!entityCounts[entityId]) entityCounts[entityId] = 0;
    entityCounts[entityId]++;
  }

  for (let entityId in entityCounts) {

    if (entityCounts[entityId] > 50) {

      await supabase.from('entity_risk_scores')
        .upsert({
          entity_id: entityId,
          risk_score: 80,
          freeze_active: false
        }, { onConflict:'entity_id' });

    }
  }

  return { statusCode:200, body:"ok" };
}
