import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

const { data } =
await supabase
.from("track_forks")
.select("original_track_id,fork_artist")

return{
statusCode:200,
body:JSON.stringify({
collaboration_graph:data
})
}

}
