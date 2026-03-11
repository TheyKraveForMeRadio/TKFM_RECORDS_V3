import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

 const email = event.queryStringParameters.email

 const { data } = await supabase
  .from('investor_balances')
  .select('*')
  .eq('investor_email',email)

 return{
  statusCode:200,
  body:JSON.stringify(data)
 }

}
