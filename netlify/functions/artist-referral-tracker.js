import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data } =
 await supabase
 .from("referral_signups")
 .select("*")

 return{
  statusCode:200,
  body:JSON.stringify({
   referrals:data||[]
  })
 }

}
