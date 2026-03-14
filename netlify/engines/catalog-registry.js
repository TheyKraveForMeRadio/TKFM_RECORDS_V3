import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

function generateCatalogId(){

 return "TKFM-"+crypto.randomBytes(8).toString("hex")

}

export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { title, artist, owner_wallet } = body

 const catalog_id = generateCatalogId()

 const { data } = await supabase
  .from("catalog_registry")
  .insert({
   catalog_id,
   title,
   artist,
   owner_wallet,
   created_at:new Date().toISOString()
  })

 return {
  statusCode:200,
  body:JSON.stringify({
   registered:true,
   catalog_id,
   data
  })
 }

}
