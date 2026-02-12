import { supabase } from './supabase.js';

export async function handler(event, context){
  const { data: plays } = await supabase.from('tkfm_radio_plays').select('*').eq('settled', false);
  for(const p of plays){
    // Simple revenue split: artist 70%, label 30%
    const revenue = 1.0; // 1$ per play for example
    const artistRevenue = revenue * 0.7;
    const labelRevenue = revenue * 0.3;
    await supabase.from('tkfm_royalties').insert({artist_email:p.artist_email, amount:artistRevenue, track_name:p.track_name});
    await supabase.from('tkfm_radio_plays').update({settled:true}).eq('id', p.id);
  }
  return { statusCode:200, body: JSON.stringify({ success:true, processed: plays.length }) };
}
