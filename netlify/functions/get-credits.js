import { supabase } from './supabase.js';

export async function handler(event, context) {
  try {
    const { data, error } = await supabase
      .from('artist_credits')
      .select('*');
    if (error) throw error;

    const result = {};
    data.forEach(row => {
      if (!result[row.email]) result[row.email] = {};
      result[row.email][row.credit_key] = row.amount;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
