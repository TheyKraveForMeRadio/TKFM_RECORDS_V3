import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const {count:artists} = await supabase
.from("artists")
.select("*",{count:"exact",head:true})

const {count:catalogs} = await supabase
.from("catalogs")
.select("*",{count:"exact",head:true})

const {count:ipos} = await supabase
.from("catalog_ipos")
.select("*",{count:"exact",head:true})

const {count:referrals} = await supabase
.from("artist_referrals")
.select("*",{count:"exact",head:true})

const {count:investments} = await supabase
.from("catalog_investments")
.select("*",{count:"exact",head:true})

return {
statusCode:200,
body:JSON.stringify({
artists,
catalogs,
ipos,
referrals,
investments,
timestamp:new Date().toISOString()
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
