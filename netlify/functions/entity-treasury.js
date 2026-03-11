import { supabase } from './supabase.js';
import { loadEntity } from './entity-context.js';

export async function handler(event) {

  const entity = await loadEntity(event);

  if (!entity) {
    return { statusCode:400, body:'Missing entity context' };
  }

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('*')
    .eq('entity_id', entity.id);

  return {
    statusCode:200,
    body:JSON.stringify({
      entity:entity.slug,
      balances
    })
  };
}
