import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

try {

const data = JSON.parse(event.body)

const {
trade_id,
token_id,
buyer_id,
seller_id,
price,
quantity
} = data

const tradeValue = price * quantity

/* -----------------------------------------
BUYER LEDGER ENTRY
----------------------------------------- */

await supabase
.schema("finance")
.from("platform_ledger")
.insert({
entity_type: "investor",
entity_id: buyer_id,
transaction_type: "token_purchase",
amount: -tradeValue,
currency: "USD",
reference: trade_id
})

/* -----------------------------------------
SELLER LEDGER ENTRY
----------------------------------------- */

await supabase
.schema("finance")
.from("platform_ledger")
.insert({
entity_type: "investor",
entity_id: seller_id,
transaction_type: "token_sale",
amount: tradeValue,
currency: "USD",
reference: trade_id
})

/* -----------------------------------------
PLATFORM FEE
----------------------------------------- */

const fee = tradeValue * 0.02

await supabase
.schema("finance")
.from("platform_ledger")
.insert({
entity_type: "platform",
entity_id: "tkfm",
transaction_type: "trade_fee",
amount: fee,
currency: "USD",
reference: trade_id
})

return {
statusCode: 200,
body: JSON.stringify({
success: true,
trade_id,
settled: true
})
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
