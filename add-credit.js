import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { email, credit_type, amount } = JSON.parse(event.body || '{}');

  if (!email || !credit_type || !amount) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'email, credit_type, amount required' })
    };
  }

  const { data: artist, error } = await supabase
    .from('tkfm_artists')
    .select('credits')
    .eq('email', email)
    .single();

  if (error || !artist) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Artist not found' })
    };
  }

  const credits = artist.credits || {};
  credits[credit_type] = (credits[credit_type] || 0) + Number(amount);

  await supabase
    .from('tkfm_artists')
    .update({ credits })
    .eq('email', email);

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      credits
    })
  };
}
