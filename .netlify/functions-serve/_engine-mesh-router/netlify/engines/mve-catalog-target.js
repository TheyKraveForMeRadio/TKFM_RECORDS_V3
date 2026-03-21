import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

const { count } =
await supabase
.from("catalogs")
.select("*",{count:"exact",head:true})

return{
statusCode:200,
body:JSON.stringify({
target:500,
current:count || 0,
progress:((count||0)/500)*100
})
}

}
