import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:jobs } =
  await supabase
  .from("distribution_queue")
  .select("*")
  .eq("status","pending")

 for(const job of jobs){

  await supabase
   .from("distribution_queue")
   .update({
    status:"delivered",
    delivered_at:new Date().toISOString()
   })
   .eq("id",job.id)

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   distributed:true
  })
 }

}
