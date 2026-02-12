import { supabase } from './supabase.js';

export async function handler(event) {
  const email = event.queryStringParameters.email;
  const { data } = await supabase
    .from('tkfm_artists')
    .select('subscription_active')
    .eq('email', email)
    .single();

  return {
    statusCode: 200,
    body: JSON.stringify({ active: data?.subscription_active || false })
  };
}
