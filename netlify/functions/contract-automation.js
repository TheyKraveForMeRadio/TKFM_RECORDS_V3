import { supabase } from './supabase.js';

export async function handler(event) {

  const { entity_slug, contract_term_months, enterprise_rate } =
    JSON.parse(event.body);

  await supabase.from('enterprise_contracts').insert({
    entity_slug,
    contract_term_months,
    enterprise_rate,
    signed_at:new Date().toISOString()
  });

  return {
    statusCode:200,
    body:JSON.stringify({status:"contract_created"})
  };
}
