import { supabase } from './supabase.js';

export async function handler(event) {

  const { entity_slug, stage } = JSON.parse(event.body);

  await supabase.from('contract_pipeline').upsert({
    entity_slug,
    stage,
    updated_at:new Date().toISOString()
  });

  return {
    statusCode:200,
    body:JSON.stringify({status:"updated"})
  };
}
