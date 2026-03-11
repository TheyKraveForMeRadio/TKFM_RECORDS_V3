import { supabase } from './supabase.js';
import { success, failure } from './_response.js';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return failure('Method not allowed', 405);
  }

  try {
    const { email, credit_type, amount = 1 } = JSON.parse(event.body || '{}');

    if (!email || !credit_type) {
      return failure('Email and credit_type required');
    }

    const { data: artist, error } = await supabase
      .from('tkfm_artists')
      .select('credits')
      .eq('email', email)
      .single();

    if (error || !artist) return failure('Artist not found');

    const credits = artist.credits || {};
    const currentBalance = credits[credit_type] || 0;
    const newBalance = currentBalance + amount;

    credits[credit_type] = newBalance;

    await supabase
      .from('tkfm_artists')
      .update({ credits })
      .eq('email', email);

    // 🔥 INSERT LEDGER ENTRY
    await supabase
      .from('tkfm_credit_ledger')
      .insert({
        email,
        action: 'credit',
        credit_type,
        amount,
        balance_after: newBalance,
        metadata: { source: 'add-credit' }
      });

    return success({
      credit_type,
      balance_after: newBalance
    });

  } catch (err) {
    return failure(err.message, 500);
  }
}
