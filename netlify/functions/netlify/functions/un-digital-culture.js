import { supabase } from './supabase.js';

export async function handler(event) {
  const { label, activity_type, description } = JSON.parse(event.body);
  const { data, error } = await supabase
    .from('tkfm_global_culture')
    .insert([{ label, activity_type, description }]);
  if (error) return { statusCode: 500, body: JSON.stringify({ error }) };
  return { statusCode: 200, body: JSON.stringify({ record: data[0] }) };
}
