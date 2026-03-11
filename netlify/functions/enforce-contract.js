import { supabase } from './supabase.js';
import { success, failure } from './_response.js';

export async function handler(event) {
  const email = event.queryStringParameters?.email;

  if (!email) {
    return failure('Email required', 400);
  }

  try {
    const { data, error } = await supabase
      .from('tkfm_artists')
      .select('contract_accepted')
      .eq('email', email)
      .single();

    if (error) return failure(error.message, 400);

    return success({ allowed: data?.contract_accepted || false });

  } catch (err) {
    return failure(err.message, 500);
  }
}
