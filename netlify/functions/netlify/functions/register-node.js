import { supabase } from './supabase.js';

export async function handler(event) {
  const { city, nodeId } = JSON.parse(event.body);
  const { data, error } = await supabase.from('tkfm_nodes').insert({ city, nodeId });
  return { statusCode: 200, body: JSON.stringify({ data, error }) };
}
