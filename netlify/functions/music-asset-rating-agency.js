import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
MUSIC ASSET RATING AGENCY

Rates catalogs based on:

streaming revenue
royalty yield
price stability
market cap
*/

function getRating(score){

if(score >= 90) return "AAA"
if(score >= 80) return "AA"
if(score >= 70) return "A"
if(score >= 60) return "BBB"
if(score >= 50) return "BB"
return "B"

}

async function rateCatalog(catalog){

const score =
(catalog.royalty_yield * 40) +
(catalog.market_cap / 1000000) +
(Math.random()*10)

const rating = getRating(score)

await supabase.from("catalog_ratings").insert({
catalog_id:catalog.id,
rating,
score,
created_at:new Date().toISOString()
})

}

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("*")
.limit(200)

for(const catalog of catalogs){

await rateCatalog(catalog)

}

return {
statusCode:200,
body:JSON.stringify({
status:"ratings generated"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
