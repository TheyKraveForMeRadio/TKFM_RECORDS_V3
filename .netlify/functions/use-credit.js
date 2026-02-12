import { supabase } from './supabase.js';

export async function handler(event) {
  const { email, credit_key } = JSON.parse(event.body || '{}');
  if (!email || !credit_key) {
    return { statusCode: 400, body: 'Missing params' };
  }

  const { data, error } = await supabase
    .from('credits')
    .select('*')
    .eq('email', email)
    .eq('credit_key', credit_key)
    .single();

  if (error || !data || data.balance <= 0) {
    return { statusCode: 403, body: 'No credits remaining' };
  }

  await supabase
    .from('credits')
    .update({ balance: data.balance - 1 })
    .eq('id', data.id);

  await supabase.from('credit_logs').insert({
    email,
    credit_key,
    action: 'use'
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, remaining: data.balance - 1 })
  };
}
