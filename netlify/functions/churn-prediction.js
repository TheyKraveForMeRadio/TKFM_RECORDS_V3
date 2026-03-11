import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('entity_slug, last_active_at');

  const now = Date.now();

  const predictions = (entities||[]).map(e => {

    const daysInactive =
      (now - new Date(e.last_active_at).getTime()) / (1000*60*60*24);

    let risk = "Low";

    if(daysInactive > 30) risk = "Medium";
    if(daysInactive > 60) risk = "High";

    return {
      entity:e.entity_slug,
      daysInactive,
      churnRisk:risk
    };
  });

  return {
    statusCode:200,
    body:JSON.stringify(predictions)
  };
}
