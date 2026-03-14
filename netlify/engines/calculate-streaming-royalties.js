import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:streams } =
  await supabase
   .from("streaming_events")
   .select("*")

 let royalty = 0

 if(streams){
  royalty = streams.length * 0.004
 }

 await supabase
  .from("royalty_events")
  .insert({
   amount:royalty,
   source:"streaming",
   created_at:new Date().toISOString()
  })

 return{
  statusCode:200,
  body:JSON.stringify({
   royalty_generated:royalty
  })
 }

}
