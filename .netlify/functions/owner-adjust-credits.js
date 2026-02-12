import { supabase } from './supabase.js';

export async function handler(event) {
  const { owner_key, email, credit_key, amount } = JSON.parse(event.body || '{}');

  if (owner_key !== process.env.TKFM_OWNER_KEY) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const { data } = await supabase
    .from('credits')
    .select('*')
    .eq('email', email)
    .eq('credit_key', credit_key)
    .single();

  if (data) {
    await supabase
      .from('credits')
      .update({ balance: data.balance + amount })
      .eq('id', data.id);
  } else {
    await supabase.from('credits').insert({
      email,
      credit_key,
      balance: amount
    });
  }

  await supabase.from('credit_logs').insert({
    email,
    credit_key,
    action: 'owner_adjust',
    amount
  });

  return { statusCode: 200, body: 'Credits updated' };
}
