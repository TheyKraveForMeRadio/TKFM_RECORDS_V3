import { supabase } from './supabase.js';

export async function handler(event) {
  const { track_id, revenue } = JSON.parse(event.body || '{}');

  const artistShare = revenue * 0.6;
  const labelShare = revenue * 0.3;
  const platformShare = revenue * 0.1;

  await supabase.from('radio_revenue').insert({
    track_id,
    revenue,
    artist_share: artistShare,
    label_share: labelShare,
    platform_share: platformShare
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
