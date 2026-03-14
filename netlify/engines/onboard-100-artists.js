import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:artists } =
  await supabase.from("artists").select("*")

 const count = artists?.length || 0

 return{
  statusCode:200,
  body:JSON.stringify({
   artists_onboarded:count,
   target:100
  })
 }

}
