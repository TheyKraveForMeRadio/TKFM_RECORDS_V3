import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data } =
  await supabase.from("creators").select("*")

 const total = data?.length || 0

 return{
  statusCode:200,
  body:JSON.stringify({
   creator_count:total,
   milestone_10k:10000
  })
 }

}
