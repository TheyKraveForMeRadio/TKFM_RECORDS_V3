import { supabase } from './supabase.js';

export async function handler(event) {
  const { actor, action_type, details } = JSON.parse(event.body);

  const { data, error } = await supabase.from('tkfm_global_culture').insert([{
    label: 'TKFM Blockchain Mirror',
    activity_type: action_type,
    description: JSON.stringify({ actor, details })
  }]);

  if (error) return { statusCode: 500, body: JSON.stringify({ error }) };
  return { statusCode: 200, body: JSON.stringify({ success: true, data }) };
}
