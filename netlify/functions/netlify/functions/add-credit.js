import { supabase } from './supabase.js';

export async function handler(event, context) {
  const { email, credit_type, amount } = JSON.parse(event.body);
  const { data, error } = await supabase
    .from('tkfm_artists')
    .update({ credits: supabase.raw('jsonb_set(credits, ?, ?)', [`{${credit_type}}`, amount]) })
    .eq('email', email);
  return { statusCode: 200, body: JSON.stringify({ success: !error, data }) };
}
