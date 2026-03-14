import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { creator_id, bond_value } = body

 await supabase
  .from("creator_bonds")
  .insert({
   creator_id,
   bond_value,
   created_at:new Date().toISOString()
  })

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"bond issued"
  })
}
}
