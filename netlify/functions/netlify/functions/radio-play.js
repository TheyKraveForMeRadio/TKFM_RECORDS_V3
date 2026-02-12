import { supabase } from './supabase.js';

export async function handler(event, context) {
  const { trackName, artistEmail } = JSON.parse(event.body);
  await supabase.from('tkfm_radio_plays').insert({ track_name: trackName, artist_email: artistEmail });
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
}
