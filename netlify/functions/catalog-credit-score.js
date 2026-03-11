import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
CREDIT SCORING ENGINE

Measures risk of a catalog.
*/

async function calculateScore(catalog){

let score = 0

score += catalog.streams_last_year * 0.00001
score += catalog.royalty_yield * 20
score += catalog.market_cap * 0.00001

return score

}

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("*")

for(const catalog of catalogs){

const score = await calculateScore(catalog)

await supabase.from("catalog_credit_scores").insert({
catalog_id:catalog.id,
credit_score:score,
created_at:new Date().toISOString()
})

}

return {
statusCode:200,
body:JSON.stringify({
status:"credit scores generated"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
