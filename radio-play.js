import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { trackName, artistEmail } = JSON.parse(event.body || '{}');

  if (!trackName || !artistEmail) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'trackName and artistEmail required' })
    };
  }

  await supabase
    .from('tkfm_radio_plays')
    .insert({
      track_name: trackName,
      artist_email: artistEmail
    });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
