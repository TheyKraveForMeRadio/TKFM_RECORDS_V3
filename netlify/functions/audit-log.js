import crypto from 'crypto';
import { supabase } from './supabase.js';

export async function handler(event) {

  const { actor_email, role, action, metadata } =
    JSON.parse(event.body || '{}');

  const { data: last } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending:false })
    .limit(1)
    .single();

  const previousHash = last?.hash || '';

  const raw = previousHash + action + JSON.stringify(metadata) + Date.now();

  const hash = crypto.createHash('sha256')
    .update(raw)
    .digest('hex');

  await supabase.from('audit_logs').insert({
    actor_email,
    role,
    action,
    metadata,
    previous_hash: previousHash,
    hash
  });

  return { statusCode:200, body:JSON.stringify({ logged:true }) };
}
