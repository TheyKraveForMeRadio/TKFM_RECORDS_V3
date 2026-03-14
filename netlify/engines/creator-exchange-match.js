import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data: orders } = await supabase
  .from("creator_orders")
  .select("*")

 return{
  statusCode:200,
  body:JSON.stringify({
   matching:"running",
   orders
  })
 }

}
