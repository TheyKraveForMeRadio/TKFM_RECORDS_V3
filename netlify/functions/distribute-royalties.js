import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

 const { catalog_id } = JSON.parse(event.body)

 const { data:revenue } = await supabase
  .from('streaming_revenue_events')
  .select('*')
  .eq('catalog_id',catalog_id)

 let totalRevenue = 0

 revenue.forEach(r=>{
  totalRevenue += r.revenue_usd
 })

 const { data:holders } = await supabase
  .from('token_holders')
  .select('*')
  .eq('token_id',catalog_id)

 let totalTokens = 0

 holders.forEach(h=>{
  totalTokens += h.tokens_owned
 })

 for(const holder of holders){

  const share =
   (holder.tokens_owned / totalTokens) * totalRevenue

  await supabase.from('investor_balances')
   .upsert({
    investor_email:holder.investor_email,
    balance_usd:share
   },{
    onConflict:'investor_email'
   })

  await supabase.from('royalty_payouts')
   .insert({
    investor_email:holder.investor_email,
    amount:share,
    catalog_id
   })

 }

 await supabase.from('royalty_distributions')
  .insert({
   catalog_id,
   total_revenue:totalRevenue
  })

 return{
  statusCode:200,
  body:JSON.stringify({
   catalog_id,
   totalRevenue
  })
 }

}
