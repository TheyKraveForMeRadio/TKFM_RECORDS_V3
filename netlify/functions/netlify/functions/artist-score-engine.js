import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  const { data: artists } = await supabase.from('tkfm_artists').select('*');

  for (const a of artists) {
    const { count: plays } = await supabase
      .from('tkfm_radio_plays')
      .select('*', { count: 'exact', head: true })
      .eq('artist_email', a.email);

    const spend = Object.values(a.credits || {}).reduce((s,v)=>s+v,0);

    const score = (plays * 2) + spend;

    await supabase
      .from('tkfm_artists')
      .update({ score })
      .eq('email', a.email);
  }

  return { statusCode: 200, body: 'scores updated' };
}
