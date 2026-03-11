import { supabase } from './supabase.js';

export async function handler() {

  const { data: usage } = await supabase
    .from('usage_metrics')
    .select('*');

  const triggers = (usage||[])
    .filter(u => u.billable_units > 100)
    .map(u => ({
      entity:u.entity_slug,
      suggestion:"Upgrade to enterprise tier"
    }));

  return {
    statusCode:200,
    body:JSON.stringify(triggers)
  };
}
