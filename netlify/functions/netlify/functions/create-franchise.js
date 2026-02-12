import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { city, owner_email } = JSON.parse(event.body);

  await supabase.from('tkfm_franchises').insert({
    city,
    owner_email,
    status: 'active',
    revenue_split: 0.7
  });

  return { statusCode: 200, body: 'FRANCHISE CREATED' };
}
