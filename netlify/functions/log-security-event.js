import { supabase } from './supabase.js';

export async function handler(event) {

  const { event_type, severity, actor, metadata } =
    JSON.parse(event.body || '{}');

  await supabase.from('security_events').insert({
    event_type,
    severity,
    actor,
    metadata
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ logged: true })
  };
}
