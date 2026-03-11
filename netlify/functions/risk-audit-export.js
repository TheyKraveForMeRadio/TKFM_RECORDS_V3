import { supabase } from './supabase.js';

export async function handler(event) {

  const entity_id = event.queryStringParameters?.entity_id;

  if (!entity_id) {
    return { statusCode:400, body:"Entity required" };
  }

  const { data: risk } = await supabase
    .from('entity_risk_scores')
    .select('*')
    .eq('entity_id', entity_id)
    .single();

  const { data: history } = await supabase
    .from('risk_score_history')
    .select('*')
    .eq('entity_id', entity_id)
    .order('created_at',{ascending:true});

  const { data: events } = await supabase
    .from('security_events')
    .select('*')
    .eq('actor', entity_id);

  return {
    statusCode:200,
    body:JSON.stringify({
      exported_at:new Date().toISOString(),
      entity_id,
      current_risk:risk,
      risk_history:history,
      security_events:events
    })
  };
}
