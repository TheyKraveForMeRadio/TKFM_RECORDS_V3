import { supabase } from './supabase.js';

export async function handler(event, context) {
  const { data, error } = await supabase
    .from('tkfm_finance_streams')
    .select('*');
  if (error) return { statusCode: 500, body: JSON.stringify(error) };
  return { statusCode: 200, body: JSON.stringify(data) };
}
