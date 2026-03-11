import { supabase } from './supabase.js';

export async function handler() {

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('entity_id, principal');

  const entities = (loans||[]).map(l=>l.entity_id);

  const matrix = entities.map(e1 =>
    entities.map(e2 =>
      e1 === e2 ? 1 : 0.25
    )
  );

  return {
    statusCode:200,
    body:JSON.stringify({
      entities,
      correlationMatrix:matrix
    })
  };
}
