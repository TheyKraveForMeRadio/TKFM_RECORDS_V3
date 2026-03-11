import { supabase } from './supabase.js';

export async function handler(event) {

  const { entity_id, requested_by } = JSON.parse(event.body || '{}');

  if (!entity_id) {
    return { statusCode:400, body:"entity_id required" };
  }

  await supabase.from('freeze_approvals').insert({
    entity_id,
    requested_by,
    status:'pending'
  });

  return {
    statusCode:200,
    body:JSON.stringify({ success:true })
  };
}
