import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

const { count:artists } =
await supabase
.from("artists")
.select("*",{count:"exact",head:true})

const { count:catalogs } =
await supabase
.from("catalogs")
.select("*",{count:"exact",head:true})

const { count:ipos } =
await supabase
.from("catalog_ipos")
.select("*",{count:"exact",head:true})

return{
statusCode:200,
body:JSON.stringify({
artists:artists||0,
catalogs:catalogs||0,
ipos:ipos||0,
target:{
artists:100,
catalogs:500,
ipos:10
}
})
}

}
