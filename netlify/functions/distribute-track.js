import { supabase } from './supabase.js';
import { success, failure } from './_response.js';

export async function handler(event) {
  const email = event.queryStringParameters?.email;

  if (!email) return failure('Email required');

  try {
    const { data, error } = await supabase
      .from('submissions')
      .update({ status: 'distributed' })
      .eq('email', email)
      .select();

    if (error) return failure(error.message);

    return success({ updated: data });

  } catch (err) {
    return failure(err.message, 500);
  }
}
