import { supabase } from './supabase.js';
import { TKFM_DISTRIBUTION } from '/js/tkfm-distribution.js';

export async function handler(event, context) {
  // Fetch all tracks that need distribution
  const { data: tracks } = await supabase.from('tkfm_tracks').select('*').eq('status','submitted');
  for(const t of tracks){
    await TKFM_DISTRIBUTION.distributeTrack(t.artist_email, t.id);
    await supabase.from('tkfm_tracks').update({status:'distributed'}).eq('id', t.id);
  }
  return { statusCode:200, body: JSON.stringify({ success:true, distributed: tracks.length }) };
}
