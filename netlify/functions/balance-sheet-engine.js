import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try {

/* --------------------------------
GET LEDGER DATA
-------------------------------- */

const { data } = await supabase
.schema("finance")
.from("platform_ledger")
.select("*")

const ledger = data || []

/* --------------------------------
CALCULATIONS
-------------------------------- */

let platformRevenue = 0
let artistLiabilities = 0
let investorBalances = 0

for (const tx of ledger) {

if (tx.entity_type === "platform") {

platformRevenue += Number(tx.amount)

}

if (tx.entity_type === "artist") {

artistLiabilities += Number(tx.amount)

}

if (tx.entity_type === "investor") {

investorBalances += Number(tx.amount)

}

}

/* --------------------------------
BALANCE SHEET
-------------------------------- */

const assets = platformRevenue

const liabilities = artistLiabilities + investorBalances

const equity = assets - liabilities

return {

statusCode: 200,

body: JSON.stringify({

assets,
liabilities,
equity,

platform_revenue: platformRevenue,
artist_liabilities: artistLiabilities,
investor_balances: investorBalances

})

}

} catch (err) {

return {

statusCode: 500,
body: JSON.stringify({ error: err.message })

}

}

}
