import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

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

const status = {
artists: artists || 0,
catalogs: catalogs || 0,
ipos: ipos || 0
}

let stage = "BOOTSTRAP"

if(status.artists >= 100 &&
   status.catalogs >= 500 &&
   status.ipos >= 10){

stage = "MUSIC_ECONOMY_ACTIVE"

}else if(status.artists >= 25){
stage = "EARLY_NETWORK"
}

return {
statusCode:200,
body:JSON.stringify({
stage,
metrics:status
})
}

}
