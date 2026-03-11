import { supabase } from './supabase.js';

export async function handler() {

  const { data: expenses } =
    await supabase.from('expenses').select('*');

  const monthlyBurn =
    expenses?.reduce((s,e)=>s+(e.amount||0),0) || 0;

  return {
    statusCode:200,
    body:JSON.stringify({
      monthlyBurn
    })
  };
}
