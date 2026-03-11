import { supabase } from './supabase.js';

export async function handler(event) {
  const email = event.queryStringParameters?.email;

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email required" })
    };
  }

  const { data, error } = await supabase
    .from('tkfm_artists')
    .select('subscription_active')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      active: data?.subscription_active === true
    })
  };
}
