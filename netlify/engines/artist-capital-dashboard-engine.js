import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

try{

const body = JSON.parse(event.body || "{}")
const artist_id = body.artist_id

/* LOAD ARTIST TOKENS */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")
.eq("artist_id",artist_id)

let dashboard = []

for(const token of tokens || []){

const price = Number(token.price || 0)
const supply = Number(token.total_supply || 0)

const marketCap = price * supply

/* INVESTOR COUNT */

const { data: holders } = await supabase
.from("token_holders")
.select("*")
.eq("token_id",token.id)

const investorCount = holders?.length || 0

/* STREAMING REVENUE */

const { data: streams } = await supabase
.from("streaming_revenue_events")
.select("*")
.eq("track_id",token.id)

let streamingRevenue = 0

for(const s of streams || []){
streamingRevenue += Number(s.amount || 0)
}

/* ROYALTY PAYOUTS */

const { data: payouts } = await supabase
.from("royalty_distributions")
.select("*")
.eq("track_id",token.id)

let royalties = 0

for(const p of payouts || []){
royalties += Number(p.amount || 0)
}

dashboard.push({

token_id:token.id,
song:token.name,
price:price,
market_cap:marketCap,
investors:investorCount,
streaming_revenue:streamingRevenue,
royalties_paid:royalties

})

}

return{

statusCode:200,

body:JSON.stringify({

artist_id,
catalog:dashboard

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
