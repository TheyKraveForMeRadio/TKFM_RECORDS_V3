import { supabase } from './supabase.js';

export async function handler(event) {

  const payload = JSON.parse(event.body);

  await supabase.from('analytics_events').insert({
    event_type: payload.type,
    raw: payload,
    created_at: new Date().toISOString()
  });

  return { statusCode:200, body:"ok" };
}
