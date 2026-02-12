import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {

  const { data: artists } = await supabase
    .from('tkfm_artists')
    .select('*');

  for (const artist of artists) {

    /* 🔴 AUTO-KILL UNPAID */
    if (!artist.subscription_active) {
      await supabase
        .from('tkfm_artists')
        .update({ credits: {} })
        .eq('email', artist.email);
      continue;
    }

    /* 🔥 AUTO-BOOST HIGH ACTIVITY */
    const { count } = await supabase
      .from('tkfm_radio_plays')
      .select('*', { count: 'exact', head: true })
      .eq('artist_email', artist.email);

    if (count > 25) {
      const credits = artist.credits || {};
      credits.ai_drops_25 = (credits.ai_drops_25 || 0) + 25;

      await supabase
        .from('tkfm_artists')
        .update({ credits })
        .eq('email', artist.email);
    }
  }

  return { statusCode: 200, body: 'automation complete' };
}
