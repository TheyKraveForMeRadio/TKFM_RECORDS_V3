import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data } = await supabase
.from("catalogs")
.select("title,market_cap")

let total=0

const songs=(data||[]).map(song=>{

total += song.market_cap || 0

return{
name:song.title,
price:song.market_cap
}

})

return{
statusCode:200,
body:JSON.stringify({
index:total,
songs:songs.slice(0,10)
})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({
error:err.message
})
}

}

}
