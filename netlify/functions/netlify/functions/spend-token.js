import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { email, amount, reason } = JSON.parse(event.body);

  await supabase.rpc('decrement_token_balance', {
    artist_email: email,
    amt: amount,
    note: reason
  });

  return { statusCode: 200, body: 'TOKENS SPENT' };
}
