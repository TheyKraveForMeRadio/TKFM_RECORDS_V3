import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
AI MARKET STABILIZER

Prevents extreme volatility in catalog markets.
*/

export async function handler(){

try{

const { data:prices } = await supabase
.from("catalog_price_history")
.select("*")
.order("timestamp",{ascending:false})
.limit(100)

let volatility = 0

for(const p of prices){
volatility += Math.abs(p.price_change || 0)
}

if(volatility > 100){

await supabase.from("ai_market_actions").insert({
action:"inject_liquidity",
created_at:new Date().toISOString()
})

}

return {
statusCode:200,
body:JSON.stringify({volatility})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
