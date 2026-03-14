import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

const { data:usage } =
await supabase
.from("music_usage_reports")
.select("*")

let royalties=[]

for(const u of usage || []){

const amount = (u.plays || 0) * 0.005

royalties.push({
track_id:u.track_id,
royalty:amount
})

}

return{
statusCode:200,
body:JSON.stringify(royalties)
}

}
