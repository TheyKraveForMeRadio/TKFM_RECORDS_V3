import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:topSongs } = await supabase
.from("catalogs")
.select("title,market_cap")
.order("market_cap",{ascending:false})
.limit(10)

const { data:topArtists } = await supabase
.from("artists")
.select("name,total_market_cap")
.order("total_market_cap",{ascending:false})
.limit(10)

const { data:topInvestors } = await supabase
.from("fan_portfolio")
.select("name,investments")
.order("investments",{ascending:false})
.limit(10)

return {
statusCode:200,
body:JSON.stringify({
topSongs:topSongs||[],
topArtists:topArtists||[],
topInvestors:topInvestors||[]
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
