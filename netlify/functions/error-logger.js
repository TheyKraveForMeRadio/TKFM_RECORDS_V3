import { supabase } from './supabase.js';

export async function handler(event) {

  const { source, message } = JSON.parse(event.body);

  await supabase.from('error_logs').insert({
    source,
    message
  });

  return { statusCode:200 };
}
