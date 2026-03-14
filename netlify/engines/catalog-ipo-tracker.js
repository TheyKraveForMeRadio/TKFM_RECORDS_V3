import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { count } = await supabase
  .from("catalog_ipos")
  .select("*",{ count:"exact", head:true })

 return {
  statusCode:200,
  body:JSON.stringify({
   milestone:"10 catalog IPOs",
   current_ipos:count || 0,
   progress: Math.min(((count||0)/10)*100,100)
  })
 }

}
