import { supabase } from './supabase.js';

export async function handler() {

  const { data } = await supabase
    .from('analytics_events')
    .select('*');

  return {
    statusCode:200,
    body:JSON.stringify({
      export_format:"json",
      records:data
    })
  };
}
