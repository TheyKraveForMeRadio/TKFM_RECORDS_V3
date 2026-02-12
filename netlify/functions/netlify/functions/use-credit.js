import { supabase } from './supabase.js';

export async function handler(event, context) {
  const { email, credit_type } = JSON.parse(event.body);
  const { data: artist } = await supabase
    .from('tkfm_artists')
    .select('credits')
    .eq('email', email)
    .single();
  const credits = artist.credits || {};
  if (!credits[credit_type] || credits[credit_type] <= 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Insufficient credits' }) };
  }
  credits[credit_type]--;
  await supabase.from('tkfm_artists').update({ credits }).eq('email', email);
  await supabase.from('tkfm_credit_usage').insert({ artist_email: email, credit_type });
  return { statusCode: 200, body: JSON.stringify({ success: true, credits }) };
}
