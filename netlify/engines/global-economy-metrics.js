import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

const { count:artists } =
await supabase
.from("artists")
.select("*",{count:"exact",head:true})

const { count:catalogs } =
await supabase
.from("catalogs")
.select("*",{count:"exact",head:true})

const { data:trades } =
await supabase
.from("catalog_trades")
.select("price,shares")

let marketValue = 0

for(const t of trades || []){
 marketValue += (t.price * t.shares)
}

return{
 statusCode:200,
 body:JSON.stringify({
  artists:artists||0,
  catalogs:catalogs||0,
  market_value:marketValue
 })
}

}
