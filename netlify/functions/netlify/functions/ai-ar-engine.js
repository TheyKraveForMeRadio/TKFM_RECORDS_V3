import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  const { data: artists } = await supabase
    .from('tkfm_artists')
    .select('*')
    .gte('score', 120)
    .eq('subscription_active', false);

  for (const a of artists) {
    await supabase.from('tkfm_artists').update({
      subscription_active: true,
      label_plan: 'monthly_basic',
      signed_by_ai: true
    }).eq('email', a.email);
  }

  return { statusCode: 200, body: 'AI A&R SIGNED ARTISTS' };
}
