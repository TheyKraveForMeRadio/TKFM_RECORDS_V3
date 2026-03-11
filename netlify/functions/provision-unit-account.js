import fetch from 'node-fetch';
import { supabase } from './supabase.js';

export async function handler(event) {

  const { entity_id, business_name } =
    JSON.parse(event.body || '{}');

  const res = await fetch(process.env.UNIT_BASE_URL + '/accounts', {
    method:'POST',
    headers:{
      'Authorization': 'Bearer ' + process.env.UNIT_API_KEY,
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      type:'depositAccount',
      attributes:{
        name: business_name
      }
    })
  });

  const json = await res.json();

  await supabase
    .from('treasury_entities')
    .update({
      bank_provider:'unit',
      external_bank_id: json.data?.id
    })
    .eq('id', entity_id);

  return {
    statusCode:200,
    body:JSON.stringify({ unit_account: json })
  };
}
