import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event){

 const { token_id, usd_in } = JSON.parse(event.body);

 const { data:pool } = await supabase
  .from('liquidity_pools')
  .select('*')
  .eq('token_id',token_id)
  .single();

 const k = pool.token_reserve * pool.usd_reserve;

 const newUsd = pool.usd_reserve + usd_in;

 const newTokenReserve = k / newUsd;

 const tokensOut = pool.token_reserve - newTokenReserve;

 await supabase
  .from('liquidity_pools')
  .update({
   usd_reserve:newUsd,
   token_reserve:newTokenReserve
  })
  .eq('id',pool.id);

 return {
  statusCode:200,
  body:JSON.stringify({
   tokens_received:tokensOut
  })
 };

}
