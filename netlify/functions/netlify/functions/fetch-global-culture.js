import { supabase } from './supabase.js';

export async function handler() {
  const { data, error } = await supabase
    .from('tkfm_global_culture')
    .select('*')
    .order('id', { ascending: false })
    .limit(50);
  if (error) return { statusCode: 500, body: JSON.stringify({ error }) };
  return { statusCode: 200, body: JSON.stringify(data) };
}
