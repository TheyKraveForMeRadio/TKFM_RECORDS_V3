import { supabase } from './supabase.js';

export async function handler(event) {
  const { artist_email, credit_type, amount } = JSON.parse(event.body);

  const { data, error } = await supabase
    .from('tkfm_artists')
    .select('credits')
    .eq('email', artist_email)
    .single();

  if (error) return { statusCode: 400, body: JSON.stringify(error) };

  const credits = data.credits || {};
  credits[credit_type] = (credits[credit_type] || 0) + amount;

  const { error: updateError } = await supabase
    .from('tkfm_artists')
    .update({ credits })
    .eq('email', artist_email);

  if (updateError) return { statusCode: 400, body: JSON.stringify(updateError) };

  return { statusCode: 200, body: JSON.stringify({ success: true, credits }) };
}
