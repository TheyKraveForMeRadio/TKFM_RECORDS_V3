import { supabase } from './supabase.js';

export async function handler() {

  const { data: balances } = await supabase
    .from('artist_balances')
    .select('available_balance');

  const capital =
    (balances||[]).reduce((s,b)=>s+Number(b.available_balance||0),0);

  const conservationBuffer = capital * 0.025;   // 2.5%
  const countercyclicalBuffer = capital * 0.01; // 1%

  const totalBuffer =
    conservationBuffer + countercyclicalBuffer;

  return {
    statusCode:200,
    body:JSON.stringify({
      capital,
      conservationBuffer,
      countercyclicalBuffer,
      totalBuffer
    })
  };
}
