import { supabase } from './supabase.js';
export async function handler(event) {
  const { email, creditType, amount } = JSON.parse(event.body);
  const { data: artist } = await supabase
    .from('tkfm_artists')
    .select('credits')
    .eq('email', email)
    .single();
  const credits = artist?.credits || {};
  credits[creditType] = (credits[creditType] || 0) + amount;
  await supabase.from('tkfm_artists').update({ credits }).eq('email', email);
  return { statusCode: 200, body: JSON.stringify({ success: true, credits }) };
}
