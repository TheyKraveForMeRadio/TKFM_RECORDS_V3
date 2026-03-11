import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const body = JSON.parse(event.body)

await supabase
.from("artists")
.insert({
artist_name:body.artist_name,
email:body.email,
joined_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
status:"artist_onboarded"
})
}

}
