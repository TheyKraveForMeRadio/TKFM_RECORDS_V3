import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

 const { catalog_id } = event.queryStringParameters

 const { data } = await supabase
  .from('streaming_revenue_events')
  .select('*')
  .eq('catalog_id',catalog_id)

 let streams = 0
 let revenue = 0

 data.forEach(r=>{
  streams += r.streams
  revenue += r.revenue_usd
 })

 return{
  statusCode:200,
  body:JSON.stringify({
   catalog_id,
   total_streams:streams,
   total_revenue:revenue
  })
 }

}
