import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {

  const { data: artists } = await supabase.from('tkfm_artists').select('*');
  const { data: plays } = await supabase.from('tkfm_radio_plays').select('*');
  const { data: credits } = await supabase.from('tkfm_credit_usage').select('*');

  const activeArtists = artists.filter(a => a.subscription_active);
  const mrr = activeArtists.reduce((sum, a) => {
    if (a.label_plan === 'monthly_premium') return sum + 149;
    return sum + 79;
  }, 0);

  return {
    statusCode: 200,
    body: JSON.stringify({
      overview: {
        total_artists: artists.length,
        active_subscriptions: activeArtists.length,
        estimated_mrr: mrr
      },
      artists,
      credits: {
        total_usage: credits.length,
        breakdown: credits.reduce((acc, c) => {
          acc[c.credit_type] = (acc[c.credit_type] || 0) + 1;
          return acc;
        }, {})
      },
      radio: {
        total_plays: plays.length
      }
    })
  };
}
