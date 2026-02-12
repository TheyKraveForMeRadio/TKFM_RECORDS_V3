import { supabase } from './supabase.js';

export async function handler(event) {
  const { data: tracks } = await supabase
    .from('tkfm_tracks')
    .select('*')
    .eq('status', 'featured');

  for (const track of tracks) {
    // Record play revenue
    await supabase
      .from('tkfm_radio_plays')
      .insert({ track_name: track.name, artist_email: track.artist_email });

    // Optional: auto-inject credits for radio engagement
    await supabase.rpc('add_credit', {
      artist_email: track.artist_email,
      credit_type: 'radio_play',
      amount: 1
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ played: tracks.length })
  };
}
