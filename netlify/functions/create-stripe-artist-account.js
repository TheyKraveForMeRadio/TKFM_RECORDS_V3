import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const artistId = body.artist_id
const email = body.email

const account = await stripe.accounts.create({

type:"express",

email:email,

capabilities:{
card_payments:{requested:true},
transfers:{requested:true}
}

})

await supabase.from("artists").update({
stripe_account_id:account.id
}).eq("id",artistId)

return {
statusCode:200,
body:JSON.stringify({
account_id:account.id
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
