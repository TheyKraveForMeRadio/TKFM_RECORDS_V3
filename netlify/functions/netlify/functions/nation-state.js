import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  await sb.from('tkfm_governance').insert({
    decree: 'TKFM IS A SOVEREIGN DIGITAL MUSIC STATE',
    authority: 'FOUNDER',
    status: 'ACTIVE'
  });

  await sb.from('tkfm_laws').insert([
    { law: 'ARTISTS PAY MONTHLY' },
    { law: 'AI CEO HAS FINAL SAY' },
    { law: 'TOKENS = ECONOMY' },
    { law: 'RADIO PLAYS = GDP' }
  ]);

  return { statusCode: 200, body: 'NATION-STATE MODE ENABLED' };
}
