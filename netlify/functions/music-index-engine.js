import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try {

/* ---------------------------------
LOAD CATALOG TOKENS
--------------------------------- */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

const tokenList = tokens || []

/* ---------------------------------
LOAD TRADES
--------------------------------- */

const { data: trades } = await supabase
.from("trades")
.select("*")

const tradeList = trades || []

/* ---------------------------------
LOAD ROYALTY EVENTS
--------------------------------- */

const { data: royalties } = await supabase
.from("streaming_revenue_events")
.select("*")

const royaltyList = royalties || []

/* ---------------------------------
CALCULATIONS
--------------------------------- */

let marketCap = 0
let totalVolume = 0
let avgPrice = 0
let royaltyYield = 0

if (tokenList.length > 0) {

for (const t of tokenList) {

const price = Number(t.price || 0)
const supply = Number(t.total_supply || 0)

marketCap += price * supply
avgPrice += price

}

avgPrice = avgPrice / tokenList.length

}

/* ---------------------------------
TRADE VOLUME
--------------------------------- */

for (const trade of tradeList) {

const value = Number(trade.price || 0) * Number(trade.quantity || 0)
totalVolume += value

}

/* ---------------------------------
ROYALTY YIELD
--------------------------------- */

let royaltyTotal = 0

for (const r of royaltyList) {

royaltyTotal += Number(r.amount || 0)

}

if (marketCap > 0) {

royaltyYield = (royaltyTotal / marketCap) * 100

}

/* ---------------------------------
INDEX SCORE
--------------------------------- */

const indexValue = marketCap / 1000000

return {

statusCode: 200,

body: JSON.stringify({

index_name: "TKFM GLOBAL MUSIC INDEX",
symbol: "TKX",

index_value: indexValue,

market_cap: marketCap,
trading_volume: totalVolume,
average_price: avgPrice,
royalty_yield: royaltyYield,

catalog_count: tokenList.length

})

}

} catch (err) {

return {

statusCode: 500,
body: JSON.stringify({ error: err.message })

}

}

}
