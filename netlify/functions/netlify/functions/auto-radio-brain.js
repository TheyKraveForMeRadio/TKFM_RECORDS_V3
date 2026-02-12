import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  const { data: tracks } = await supabase
    .from('tkfm_tracks')
    .select('*')
    .order('play_score', { ascending: false })
    .limit(50);

  for (let i = 0; i < tracks.length; i++) {
    await supabase.from('tkfm_radio_queue').insert({
      track_name: tracks[i].track_name,
      artist_email: tracks[i].artist_email,
      position: i + 1
    });
  }

  return { statusCode: 200, body: 'RADIO QUEUE REBUILT' };
}
