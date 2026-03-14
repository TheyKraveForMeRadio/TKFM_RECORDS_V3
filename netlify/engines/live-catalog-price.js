import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const catalog = event.queryStringParameters.catalog

const { data } =
await supabase
.from("catalog_trades")
.select("*")
.eq("catalog",catalog)
.order("created_at",{ascending:false})
.limit(1)

return{
statusCode:200,
body:JSON.stringify(data?.[0]||{})
}

}
