import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { catalog_id, licensee, license_type, fee } = body

 const { data } = await supabase
  .from("catalog_licenses")
  .insert({
   catalog_id,
   licensee,
   license_type,
   fee,
   created_at:new Date().toISOString()
  })

 return {
  statusCode:200,
  body:JSON.stringify({
   license_created:true,
   data
  })
 }

}
