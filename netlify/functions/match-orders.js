import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event){

 const { token_id } = event.queryStringParameters;

 const { data:buy } = await supabase
  .from('order_book')
  .select('*')
  .eq('token_id',token_id)
  .eq('side','BUY')
  .eq('status','OPEN')
  .order('price',{ascending:false})
  .limit(1)
  .single();

 const { data:sell } = await supabase
  .from('order_book')
  .select('*')
  .eq('token_id',token_id)
  .eq('side','SELL')
  .eq('status','OPEN')
  .order('price',{ascending:true})
  .limit(1)
  .single();

 if(!buy || !sell || buy.price < sell.price){

  return {
   statusCode:200,
   body:JSON.stringify({matched:false})
  };

 }

 const quantity = Math.min(buy.quantity,sell.quantity);

 const price = sell.price;

 await supabase.from('trades').insert({
  token_id,
  buyer:buy.investor_email,
  seller:sell.investor_email,
  price,
  quantity
 });

 await supabase
  .from('order_book')
  .update({status:'FILLED'})
  .in('id',[buy.id,sell.id]);

 return {
  statusCode:200,
  body:JSON.stringify({
   matched:true,
   quantity,
   price
  })
 };

}
