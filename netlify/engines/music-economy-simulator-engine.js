import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* --------------------------------
LOAD CORE DATA
-------------------------------- */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

const { data: trades } = await supabase
.from("trades")
.select("*")

const { data: streams } = await supabase
.from("streaming_revenue_events")
.select("*")

/* --------------------------------
CALCULATE MARKET CAP
-------------------------------- */

let marketCap = 0

for(const token of tokens || []){

const price = Number(token.price || 0)
const supply = Number(token.total_supply || 0)

marketCap += price * supply

}

/* --------------------------------
CALCULATE TRADE FLOW
-------------------------------- */

let tradeVolume = 0

for(const trade of trades || []){

tradeVolume +=
Number(trade.price||0) *
Number(trade.quantity||0)

}

/* --------------------------------
CALCULATE STREAM REVENUE
-------------------------------- */

let revenue = 0

for(const s of streams || []){

revenue += Number(s.amount || 0)

}

/* --------------------------------
SIMULATED ECONOMY MODEL
-------------------------------- */

const fanInvestmentGrowth = tradeVolume * 0.12
const artistGrowth = revenue * 0.25

const projectedMarketCap =
marketCap +
fanInvestmentGrowth +
artistGrowth

const royaltyYield =
marketCap > 0
? (revenue / marketCap) * 100
: 0

/* --------------------------------
RETURN MODEL
-------------------------------- */

return{

statusCode:200,

body:JSON.stringify({

economy_snapshot:{

current_market_cap:marketCap,
trade_volume:tradeVolume,
streaming_revenue:revenue

},

growth_model:{

fan_investment_growth:fanInvestmentGrowth,
artist_growth:artistGrowth

},

projections:{

projected_market_cap:projectedMarketCap,
royalty_yield:royaltyYield

}

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
