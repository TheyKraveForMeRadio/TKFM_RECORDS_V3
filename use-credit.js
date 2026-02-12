import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { email, credit_type, notes } = JSON.parse(event.body || '{}');

  if (!email || !credit_type) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'email and credit_type required' })
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
  const current = credits[credit_type] || 0;

  if (current <= 0) {
    return {
      statusCode: 402,
      body: JSON.stringify({ error: 'Insufficient credits' })
    };
  }

  credits[credit_type] = current - 1;

  await supabase
    .from('tkfm_artists')
    .update({ credits })
    .eq('email', email);

  await supabase
    .from('tkfm_credit_usage')
    .insert({
      artist_email: email,
      credit_type,
      notes: notes || 'Auto usage'
    });

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      remaining: credits[credit_type]
    })
  };
}
