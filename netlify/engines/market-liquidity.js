import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { count } =
 await supabase
 .from("trades")
 .select("*",{count:"exact",head:true})

 return{
  statusCode:200,
  body:JSON.stringify({
   total_trades:count || 0
  })
 }

}
