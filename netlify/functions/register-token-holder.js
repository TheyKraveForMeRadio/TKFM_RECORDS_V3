import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

 const { token_id, investor_email, tokens_owned } =
  JSON.parse(event.body)

 await supabase.from('token_holders').insert({
  token_id,
  investor_email,
  tokens_owned
 })

 return{
  statusCode:200,
  body:JSON.stringify({success:true})
 }

}
