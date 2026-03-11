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

    const { data: revenue } = await supabase
      .from('royalty_events')
      .select('revenue, created_at');

    const { data: ledger } = await supabase
      .from('tkfm_credit_ledger')
      .select('amount, action, created_at');

    const monthlyRevenue = {};
    const monthlyCredits = {};

    (revenue || []).forEach(r => {
      const month = r.created_at.slice(0,7);
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + Number(r.revenue);
    });

    (ledger || []).forEach(l => {
      const month = l.created_at.slice(0,7);
      if (!monthlyCredits[month]) {
        monthlyCredits[month] = { issued:0, used:0 };
      }
      if (l.action === 'credit') {
        monthlyCredits[month].issued += Number(l.amount);
      } else {
        monthlyCredits[month].used += Number(l.amount);
      }
    });

    return success({
      monthlyRevenue,
      monthlyCredits
    });

  } catch (err) {
    return failure(err.message, 500);
  }
}
