import crypto from 'crypto';
import { supabase } from './supabase.js';

export async function handler(event) {

  const { payout_id, amount, artist_email } =
    JSON.parse(event.body || '{}');

  const raw = payout_id + amount + artist_email;
  const hash = crypto.createHash('sha256')
    .update(raw)
    .digest('hex');

  await supabase.from('blockchain_settlements').insert({
    payout_id,
    artist_email,
    amount,
    hash
  });

  return {
    statusCode:200,
    body:JSON.stringify({ mirrored:true, hash })
  };
}
