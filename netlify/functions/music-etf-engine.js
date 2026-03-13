import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* LOAD SONG TOKENS */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

/* SORT BY MARKET CAP */

tokens.sort((a,b)=>{

const capA = Number(a.price||0)*Number(a.total_supply||0)
const capB = Number(b.price||0)*Number(b.total_supply||0)

return capB-capA

})

/* TOP SONG ETF */

const topSongs = tokens.slice(0,20)

let nav = 0

topSongs.forEach(t=>{
nav += Number(t.price||0)
})

nav = nav / topSongs.length

/* SAVE ETF */

await supabase
.from("music_etfs")
.upsert({

symbol:"TKFM_TOP20",
name:"Top 20 Songs ETF",
nav,
size:topSongs.length,
updated_at:new Date()

})

return{

statusCode:200,

body:JSON.stringify({

symbol:"TKFM_TOP20",
nav,
holdings:topSongs

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
