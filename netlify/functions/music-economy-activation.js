import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

const { count:artists } =
await supabase.from("artists")
.select("*",{count:"exact",head:true})

const { count:catalogs } =
await supabase.from("catalogs")
.select("*",{count:"exact",head:true})

const { count:ipos } =
await supabase.from("catalog_ipos")
.select("*",{count:"exact",head:true})

const economyActive =
artists>=100 && catalogs>=500 && ipos>=10

return{
statusCode:200,
body:JSON.stringify({
artists,
catalogs,
ipos,
economy_active:economyActive
})
}

}
