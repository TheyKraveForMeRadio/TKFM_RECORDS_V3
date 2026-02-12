import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { email, creditType, amount } = JSON.parse(event.body);

  const { data } = await supabase
    .from('tkfm_artists')
    .select('credits')
    .eq('email', email)
    .single();

  const credits = data.credits || {};
  credits[creditType] = (credits[creditType] || 0) + amount;

  await supabase
    .from('tkfm_artists')
    .update({ credits })
    .eq('email', email);

  return { statusCode: 200, body: 'ok' };
}
