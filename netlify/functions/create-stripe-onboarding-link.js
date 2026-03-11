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

const { data:artist } = await supabase
.from("artists")
.select("stripe_account_id")
.eq("id",artistId)
.single()

const accountLink = await stripe.accountLinks.create({

account:artist.stripe_account_id,

refresh_url:"https://tkfmrecords.com/artist-dashboard.html",

return_url:"https://tkfmrecords.com/stripe-connect-success.html",

type:"account_onboarding"

})

return {
statusCode:200,
body:JSON.stringify({
url:accountLink.url
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
