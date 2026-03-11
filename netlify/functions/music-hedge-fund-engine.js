import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
MUSIC HEDGE FUND ENGINE

Institutional capital pool that invests in music catalogs.
Strategy:
allocate capital to highest yield catalogs
rebalance portfolio
*/

async function allocateCapital(){

const { data:catalogs } = await supabase
.from("catalogs")
.select("id,royalty_yield,market_cap")
.order("royalty_yield",{ascending:false})
.limit(25)

if(!catalogs) return

const fundSize = 50000000
const allocation = fundSize / catalogs.length

for(const catalog of catalogs){

await supabase.from("hedge_fund_positions").insert({
catalog_id:catalog.id,
capital_allocated:allocation,
created_at:new Date().toISOString()
})

}

}

export async function handler(){

try{

await allocateCapital()

return {
statusCode:200,
body:JSON.stringify({
status:"hedge fund capital deployed"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
