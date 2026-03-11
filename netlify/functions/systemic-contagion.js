import { supabase } from './supabase.js';

export async function handler() {

  const { data: loans } = await supabase
    .from('inter_entity_loans')
    .select('entity_id, principal');

  const entities = [...new Set((loans||[]).map(l=>l.entity_id))];

  let contagionMap = {};

  entities.forEach(e => {
    contagionMap[e] = { shocked:false };
  });

  const initialShock = entities[0];
  if(initialShock) contagionMap[initialShock].shocked = true;

  loans.forEach(l => {
    if(contagionMap[l.entity_id]?.shocked) {
      entities.forEach(e => {
        if(Math.random()<0.3) contagionMap[e].shocked = true;
      });
    }
  });

  return {
    statusCode:200,
    body:JSON.stringify(contagionMap)
  };
}
