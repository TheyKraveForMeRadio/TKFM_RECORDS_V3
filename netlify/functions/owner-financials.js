import jwt from 'jsonwebtoken';
import { supabase } from './supabase.js';
import { success, failure } from './_response.js';

export async function handler(event) {

  const auth = event.headers.authorization;
  if (!auth) return failure('Unauthorized', 401);

  const token = auth.replace('Bearer ', '');

  try {
    jwt.verify(token, process.env.TKFM_JWT_SECRET);
  } catch {
    return failure('Invalid token', 401);
  }

  try {

    const { count: totalArtists } = await supabase
      .from('tkfm_artists')
      .select('*', { count: 'exact', head: true });

    const { count: activeSubs } = await supabase
      .from('tkfm_artists')
      .select('*', { count: 'exact', head: true })
      .eq('subscription_active', true);

    const { data: creditsUsed } = await supabase
      .from('tkfm_credit_ledger')
      .select('amount')
      .eq('action', 'debit');

    const { data: creditsIssued } = await supabase
      .from('tkfm_credit_ledger')
      .select('amount')
      .eq('action', 'credit');

    const totalUsed = creditsUsed?.reduce((s,r)=>s+Number(r.amount),0) || 0;
    const totalIssued = creditsIssued?.reduce((s,r)=>s+Number(r.amount),0) || 0;

    return success({
      total_artists: totalArtists || 0,
      active_subscriptions: activeSubs || 0,
      total_credits_issued: totalIssued,
      total_credits_used: totalUsed,
      credit_liability: totalIssued - totalUsed
    });

  } catch (err) {
    return failure(err.message, 500);
  }
}
