import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  const { count: artists } = await sb
    .from('tkfm_artists')
    .select('*', { count: 'exact', head: true });

  const { count: plays } = await sb
    .from('tkfm_radio_plays')
    .select('*', { count: 'exact', head: true });

  const valuation = (artists || 0) * (plays || 1) * 0.05;

  await sb.from('tkfm_ipo_reports').insert({
    artists,
    plays,
    estimated_valuation: valuation
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ artists, plays, valuation })
  };
}
