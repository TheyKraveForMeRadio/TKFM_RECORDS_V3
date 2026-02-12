import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  const { data: tracks } = await supabase
    .from('tkfm_radio_queue')
    .select('*')
    .limit(10);

  for (const t of tracks) {
    await supabase.from('tkfm_ai_dj_logs').insert({
      track_name: t.track_name,
      artist_email: t.artist_email,
      spoken: true
    });
  }

  return { statusCode: 200, body: 'AI DJ BROADCAST COMPLETE' };
}
