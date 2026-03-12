import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

const signature = event.headers["stripe-signature"]

let stripeEvent

try {

stripeEvent = stripe.webhooks.constructEvent(
event.body,
signature,
process.env.STRIPE_WEBHOOK_SECRET
)

} catch (err) {

return {
statusCode: 400,
body: `Webhook Error: ${err.message}`
}

}

if (stripeEvent.type === "checkout.session.completed") {

const session = stripeEvent.data.object

const amount = session.amount_total / 100
const currency = session.currency || "usd"

const artistId = session.metadata?.artist_id || null
const investorId = session.metadata?.investor_id || null

const artistShare = amount * 0.8
const platformFee = amount * 0.2

// INVESTOR PURCHASE ENTRY

await supabase
.schema("finance")
.from("platform_ledger")
.insert({
entity_type: "investor",
entity_id: investorId,
transaction_type: "share_purchase",
amount: amount,
currency: currency,
reference: session.id
})

// ARTIST PAYOUT ENTRY

await supabase
.schema("finance")
.from("platform_ledger")
.insert({
entity_type: "artist",
entity_id: artistId,
transaction_type: "artist_sale_revenue",
amount: artistShare,
currency: currency,
reference: session.id
})

// PLATFORM FEE ENTRY

await supabase
.schema("finance")
.from("platform_ledger")
.insert({
entity_type: "platform",
entity_id: "tkfm",
transaction_type: "platform_fee",
amount: platformFee,
currency: currency,
reference: session.id
})

}

return {
statusCode: 200,
body: JSON.stringify({ received: true })
}

}
