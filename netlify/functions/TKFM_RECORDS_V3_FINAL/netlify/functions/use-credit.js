import { supabase } from './supabase.js';
export async function handler(event) {
  const { email } = JSON.parse(event.body);
  const { data } = await supabase
    .from('tkfm_artists')
    .select('credits')
    .eq('email', email)
    .single();
  return { statusCode: 200, body: JSON.stringify(data.credits || {}) };
}
