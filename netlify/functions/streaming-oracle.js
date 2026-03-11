import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

 const { data } = await supabase
  .from('streaming_revenue_events')
  .select('*')
  .order('recorded_at',{ascending:false})
  .limit(20)

 return{
  statusCode:200,
  body:JSON.stringify(data)
 }

}
