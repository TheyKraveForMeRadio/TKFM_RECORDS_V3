import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data } = await supabase
  .from("catalog_ipos")
  .select("*")

 return {
  statusCode:200,
  body:JSON.stringify({
   marketplace:"ROYALTY_IPO",
   ipos:data
  })
 }
}
