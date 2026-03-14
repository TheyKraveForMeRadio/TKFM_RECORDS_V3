import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try {

/* -----------------------------
LOAD MARKET DATA
----------------------------- */

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("id,name,price,total_supply")

const { data: trades } = await supabase
.from("trades")
.select("*")
.order("created_at",{ascending:false})
.limit(20)

const { data: royalties } = await supabase
.from("streaming_revenue_events")
.select("*")
.order("created_at",{ascending:false})
.limit(20)

/* -----------------------------
MARKET STATS
----------------------------- */

let marketCap = 0

for (const t of tokens || []) {

const price = Number(t.price || 0)
const supply = Number(t.total_supply || 0)

marketCap += price * supply

}

const marketData = {

timestamp: Date.now(),

catalog_count: tokens?.length || 0,

market_cap: marketCap,

recent_trades: trades || [],

recent_royalties: royalties || [],

tokens: tokens || []

}

/* -----------------------------
SSE RESPONSE
----------------------------- */

return {

statusCode: 200,

headers: {
"Content-Type": "text/event-stream",
"Cache-Control": "no-cache",
"Connection": "keep-alive"
},

body: `data: ${JSON.stringify(marketData)}\n\n`

}

} catch (err) {

return {

statusCode: 500,

body: JSON.stringify({
error: err.message
})

}

}

}
