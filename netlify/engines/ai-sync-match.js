import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const { data:catalogs } =
  await supabase
   .from("catalog_registry")
   .select("*")

 const { data:opps } =
  await supabase
   .from("sync_opportunities")
   .select("*")

 const matches=[]

 for(const opp of opps){

  for(const catalog of catalogs){

   if(catalog.artist && opp.project){

    matches.push({
     catalog_id:catalog.catalog_id,
     opportunity:opp.project
    })

   }

  }

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   matches
  })
 }

}
