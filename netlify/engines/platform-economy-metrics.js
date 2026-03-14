import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { count:artists } =
 await supabase.from("artists")
 .select("*",{count:"exact",head:true})

 const { count:catalogs } =
 await supabase.from("catalogs")
 .select("*",{count:"exact",head:true})

 const { count:investors } =
 await supabase.from("catalog_investments")
 .select("*",{count:"exact",head:true})

 const { data:royalties } =
 await supabase.from("royalty_events")
 .select("amount")

 let totalRoyalties = 0

 for(const r of royalties || []){
  totalRoyalties += r.amount || 0
 }

 return{
  statusCode:200,
  body:JSON.stringify({
   artists:artists || 0,
   catalogs:catalogs || 0,
   investors:investors || 0,
   total_royalties:totalRoyalties
  })
 }

}
