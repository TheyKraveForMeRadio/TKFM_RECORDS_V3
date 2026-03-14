import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const body = JSON.parse(event.body)

await supabase
.from("track_repositories")
.insert({
track_name:body.track_name,
artist:body.artist,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
status:"track_repository_created"
})
}

}
