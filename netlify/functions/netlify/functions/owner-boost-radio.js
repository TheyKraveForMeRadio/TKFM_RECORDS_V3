import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { email, trackName } = JSON.parse(event.body);

  await supabase.from('tkfm_radio_plays').insert({
    artist_email: email,
    track_name: trackName
  });

  return { statusCode: 200, body: 'boosted' };
}
