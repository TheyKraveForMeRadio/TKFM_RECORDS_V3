import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  const { data: artists } = await supabase.from('tkfm_artists').select('*');

  for (const a of artists) {

    if (a.score >= 200 && a.label_plan !== 'monthly_premium') {
      await supabase.from('tkfm_artists')
        .update({ label_plan: 'monthly_premium' })
        .eq('email', a.email);
    }

    if (a.score < 10 && a.subscription_active) {
      await supabase.from('tkfm_artists')
        .update({ subscription_active: false })
        .eq('email', a.email);
    }
  }

  return { statusCode: 200, body: 'auto-signing complete' };
}
