import { createClient } from "@supabase/supabase-js"

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler=async(event)=>{

const body=JSON.parse(event.body)

await supabase
.from("catalog_ipos")
.insert({
artist:body.artist,
catalog:body.catalog,
raise_goal:body.raise_goal,
status:"pending",
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
status:"catalog_ipo_created"
})
}

}
