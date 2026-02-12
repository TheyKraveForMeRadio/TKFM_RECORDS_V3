import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler() {
  const { data: plays } = await sb
    .from('tkfm_radio_plays')
    .select('*')
    .order('played_at', { ascending: false })
    .limit(100);

  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(plays))
    .digest('hex');

  await sb.from('tkfm_blockchain_mirror').insert({
    snapshot_hash: hash,
    records: plays?.length || 0
  });

  return { statusCode: 200, body: 'BLOCKCHAIN MIRROR SYNCED' };
}
