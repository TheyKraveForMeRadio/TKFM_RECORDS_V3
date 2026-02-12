import { supabase } from './supabase.js';

export async function handler(event) {
  try {
    const { data: artists } = await supabase.from('tkfm_artists').select('*');
    const { data: plays } = await supabase.from('tkfm_radio_plays').select('*');
    const { data: credits } = await supabase.from('tkfm_credit_usage').select('*');

    const kpi = artists.map(a => {
      const artistPlays = plays.filter(p => p.artist_email === a.email).length;
      const usedCredits = credits.filter(c => c.artist_email === a.email);
      const creditSummary = usedCredits.reduce((acc,c)=> {
        acc[c.credit_type] = (acc[c.credit_type]||0)+1;
        return acc;
      }, {});
      return { email: a.email, name: a.name, plays: artistPlays, creditsUsed: creditSummary };
    });

    return { statusCode: 200, body: JSON.stringify(kpi) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
