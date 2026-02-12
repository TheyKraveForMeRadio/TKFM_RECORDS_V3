import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  const { data: artists } = await supabase
    .from('tkfm_artists')
    .select('*')
    .gte('score', 150);

  for (const a of artists) {
    await supabase.from('tkfm_campaigns').insert({
      artist_email: a.email,
      type: 'AUTO_PROMO',
      status: 'launched'
    });
  }

  return { statusCode: 200, body: 'promotions launched' };
}
