import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('metrics_cache')
    .select('*')
    .single();

  return {
    statusCode:200,
    body:JSON.stringify(data)
  };
}
