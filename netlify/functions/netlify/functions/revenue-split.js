import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LABEL_PERCENT = 0.30; // 30% label cut

export async function handler(event) {
  const { artistEmail, amount } = JSON.parse(event.body);

  const artistCut = amount * (1 - LABEL_PERCENT);
  const labelCut = amount * LABEL_PERCENT;

  await supabase.from('tkfm_payouts').insert([
    { email: artistEmail, amount: artistCut, type: 'artist' },
    { email: 'LABEL', amount: labelCut, type: 'label' }
  ]);

  return { statusCode: 200, body: 'split recorded' };
}
