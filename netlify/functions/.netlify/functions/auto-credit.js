import { supabase } from './supabase.js';

export async function handler(event, context){
  const { data: artists } = await supabase.from('tkfm_artists').select('*').eq('subscription_active', true);
  for(const a of artists){
    const credits = a.credits || {};
    credits.ai_drops_25 = (credits.ai_drops_25||0) + 5; // top-up 5 AI Drops per active artist
    await supabase.from('tkfm_artists').update({credits}).eq('email',a.email);
  }
  return { statusCode:200, body: JSON.stringify({ success:true, updated: artists.length }) };
}
