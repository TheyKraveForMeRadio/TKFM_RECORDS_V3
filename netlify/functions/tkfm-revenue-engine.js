import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
TKFM REVENUE ENGINE

Collects platform revenue from:

Artist SaaS
Label SaaS
Distribution
Catalog IPOs
Catalog Trading
Royalty Futures
Credit Market
*/

async function collectTradingFees(){

const { data:trades } = await supabase
.from("catalog_trades")
.select("*")
.eq("fee_collected",false)

if(!trades) return

for(const trade of trades){

const fee = trade.price * trade.quantity * 0.01

await supabase.from("platform_revenue").insert({
source:"catalog_trading",
amount:fee,
created_at:new Date().toISOString()
})

await supabase
.from("catalog_trades")
.update({fee_collected:true})
.eq("id",trade.id)

}

}

async function collectIPOFee(){

const { data:ipos } = await supabase
.from("catalog_ipos")
.select("*")
.eq("fee_collected",false)

if(!ipos) return

for(const ipo of ipos){

const fee = ipo.raise_amount * 0.05

await supabase.from("platform_revenue").insert({
source:"catalog_ipo",
amount:fee,
created_at:new Date().toISOString()
})

await supabase
.from("catalog_ipos")
.update({fee_collected:true})
.eq("id",ipo.id)

}

}

async function collectDistributionFees(){

const { data:releases } = await supabase
.from("catalogs")
.select("*")
.eq("distribution_paid",false)

if(!releases) return

for(const r of releases){

await supabase.from("platform_revenue").insert({
source:"distribution",
amount:19,
created_at:new Date().toISOString()
})

await supabase
.from("catalogs")
.update({distribution_paid:true})
.eq("id",r.id)

}

}

export async function handler(){

try{

await collectTradingFees()
await collectIPOFee()
await collectDistributionFees()

return {
statusCode:200,
body:JSON.stringify({
status:"revenue collected"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
