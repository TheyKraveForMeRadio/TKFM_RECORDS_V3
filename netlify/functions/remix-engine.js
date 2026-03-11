import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event)=>{

const body = JSON.parse(event.body)

await supabase
.from("remixes")
.insert({
original_track_id:body.original_track,
remix_artist:body.artist,
remix_title:body.title,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
status:"remix_created"
})
}

}
