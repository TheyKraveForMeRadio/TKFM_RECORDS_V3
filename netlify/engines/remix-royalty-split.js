import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event)=>{

const body = JSON.parse(event.body)

await supabase
.from("royalty_splits")
.insert({
original_artist:body.original_artist,
remix_artist:body.remix_artist,
split:"50/50",
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
status:"royalty_split_created"
})
}

}
