import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const config = {
bodyParser: false
}

export async function handler(event){

let stripeEvent

try{

const sig = event.headers["stripe-signature"]

stripeEvent = stripe.webhooks.constructEvent(
event.body,
sig,
process.env.STRIPE_WEBHOOK_SECRET
)

}catch(err){

return {
statusCode:400,
body:`Webhook signature verification failed: ${err.message}`
}

}

if(stripeEvent.type === "checkout.session.completed"){

const session = stripeEvent.data.object

if(session.payment_status !== "paid"){
return {statusCode:200}
}

const amount = session.amount_total / 100

const artistShare = amount * 0.8
const platformShare = amount * 0.2

const catalogId = session.metadata.catalog_id
const artistId = session.metadata.artist_id
const shares = session.metadata.shares

await supabase.from("transactions").insert({

catalog_id:catalogId,
artist_id:artistId,
shares:shares,
amount:amount,
artist_share:artistShare,
platform_fee:platformShare,
stripe_session:session.id,
created_at:new Date().toISOString()

})

await supabase.rpc("increment_artist_balance",{
artist_id:artistId,
amount:artistShare
})

await supabase.rpc("increment_platform_revenue",{
amount:platformShare
})

}

if(stripeEvent.type === "charge.refunded"){

const charge = stripeEvent.data.object

await supabase.from("refunds").insert({
stripe_charge:charge.id,
amount:charge.amount/100,
created_at:new Date().toISOString()
})

}

return {
statusCode:200,
body:JSON.stringify({received:true})
}

}
