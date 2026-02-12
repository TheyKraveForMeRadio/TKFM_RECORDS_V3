import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { email, active } = JSON.parse(event.body);

  await supabase
    .from('tkfm_artists')
    .update({ subscription_active: active })
    .eq('email', email);

  return { statusCode: 200, body: 'ok' };
}
