import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

 const email = event.queryStringParameters.email

 const { data } = await supabase
  .from('royalty_payouts')
  .select('*')
  .eq('investor_email',email)
  .order('created_at',{ascending:false})

 return{
  statusCode:200,
  body:JSON.stringify(data)
 }

}
