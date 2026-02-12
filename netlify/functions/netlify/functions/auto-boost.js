import { supabase } from './supabase.js';

export async function handler(event) {
  // Fetch artists
  const { data: artists } = await supabase
    .from('tkfm_artists')
    .select('*');

  for (const artist of artists) {
    // Fetch track metrics (radio plays + submissions)
    const { data: plays } = await supabase
      .from('tkfm_radio_plays')
      .select('*')
      .eq('artist_email', artist.email);

    // Simple KPI: auto-boost if plays > 10 in last 24h
    const recentPlays = plays.filter(p => {
      const playedAt = new Date(p.played_at);
      return playedAt > new Date(Date.now() - 24*60*60*1000);
    });

    if (recentPlays.length >= 10) {
      // Inject auto-credit for AI Drops
      await supabase.rpc('add_credit', {
        artist_email: artist.email,
        credit_type: 'ai_drops_25',
        amount: 5
      });
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ boosted: artists.length })
  };
}
