import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Aggregates TKFM economic activity into nation-scale metrics
export async function handler() {
  const { data: artists, count: artistCount } = await sb
    .from('tkfm_artists')
    .select('*', { count: 'exact' });

  const { count: plays } = await sb
    .from('tkfm_radio_plays')
    .select('*', { count: 'exact', head: true });

  const { data: credits } = await sb
    .from('tkfm_credit_usage')
    .select('*');

  const monthlyGDP =
    (plays || 0) * 0.02 + (credits?.length || 0) * 1.5;

  const reserves = (artistCount || 0) * 49; // base subscription reserve model

  const report = {
    nation: 'TKFM',
    artists: artistCount || 0,
    radio_plays: plays || 0,
    credit_events: credits?.length || 0,
    monthly_gdp_usd: Number(monthlyGDP.toFixed(2)),
    treasury_reserves_usd: Number(reserves.toFixed(2)),
    currency: 'TKFM-CREDIT',
    timestamp: new Date().toISOString()
  };

  await sb.from('tkfm_world_bank_reports').insert(report);

  return {
    statusCode: 200,
    body: JSON.stringify(report)
  };
}
