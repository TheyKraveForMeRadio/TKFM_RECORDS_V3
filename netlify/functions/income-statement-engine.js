import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try {

/* -----------------------------
LOAD LEDGER
----------------------------- */

const { data } = await supabase
.schema("finance")
.from("platform_ledger")
.select("*")

const ledger = data || []

/* -----------------------------
CALCULATIONS
----------------------------- */

let revenue = 0
let expenses = 0

for (const tx of ledger) {

const amount = Number(tx.amount)

if (tx.entity_type === "platform") {

revenue += amount

}

if (tx.entity_type === "artist") {

expenses += amount

}

}

/* -----------------------------
PROFIT
----------------------------- */

const netProfit = revenue - expenses

const margin = revenue > 0
? (netProfit / revenue) * 100
: 0

return {

statusCode: 200,

body: JSON.stringify({

revenue,
expenses,
net_profit: netProfit,
profit_margin: margin

})

}

} catch (err) {

return {

statusCode: 500,
body: JSON.stringify({ error: err.message })

}

}

}
