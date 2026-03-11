import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
CATALOG UNDERWRITING ENGINE

Calculates financing eligibility
based on catalog performance.
*/

async function evaluateCatalog(catalog_id){

const { data:catalog } = await supabase
.from("catalogs")
.select("*")
.eq("id",catalog_id)
.single()

if(!catalog) return null

const loanValue = catalog.market_cap * 0.6

return {
catalog_id,
approved_value:loanValue,
risk_score:Math.random()*100
}

}

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const result = await evaluateCatalog(body.catalog_id)

return {
statusCode:200,
body:JSON.stringify(result)
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
