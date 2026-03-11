import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event){

 const { token_id } = event.queryStringParameters;

 const { data:trades } = await supabase
  .from('trades')
  .select('*')
  .eq('token_id',token_id)
  .order('executed_at',{ascending:false})
  .limit(20);

 if(!trades || trades.length===0){

  return {
   statusCode:200,
   body:JSON.stringify({price:0})
  };

 }

 const total = trades.reduce((a,b)=>a+b.price,0);

 const avg = total / trades.length;

 await supabase.from('price_history').insert({
  token_id,
  price:avg
 });

 return {
  statusCode:200,
  body:JSON.stringify({
   token_id,
   price:avg
  })
 };

}
