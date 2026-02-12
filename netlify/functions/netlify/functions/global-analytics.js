import { supabase } from './supabase.js';

export async function handler(event, context) {
  const [{ count: totalTracks }, { count: totalPlays }, { data: credits }] = await Promise.all([
    supabase.from('tkfm_distribution').select('*', { count: 'exact' }),
    supabase.from('tkfm_radio_plays').select('*', { count: 'exact' }),
    supabase.from('tkfm_credit_usage').select('*')
  ]);
  return {
    statusCode: 200,
    body: JSON.stringify({
      totalTracks,
      totalPlays,
      totalCreditsUsed: credits.length
    })
  };
}
