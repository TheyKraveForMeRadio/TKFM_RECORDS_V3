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

const catalogId = body.catalog_id
const shares = body.shares || 1

const { data:catalog } = await supabase
.from("catalogs")
.select("title,price,artist_id")
.eq("id", catalogId)
.single()

if(!catalog){
return {
statusCode:404,
body:JSON.stringify({error:"Catalog not found"})
}
}

const unitPrice = catalog.price
const total = unitPrice * shares

const session = await stripe.checkout.sessions.create({

payment_method_types:["card"],

mode:"payment",

line_items:[
{
price_data:{
currency:"usd",
product_data:{
name:catalog.title
},
unit_amount: Math.round(unitPrice*100)
},
quantity:shares
}
],

metadata:{
catalog_id:catalogId,
artist_id:catalog.artist_id,
shares:shares
},

success_url:"https://tkfmrecords.com/invest-success.html",
cancel_url:"https://tkfmrecords.com/invest-cancel.html"

})

return {
statusCode:200,
body:JSON.stringify({url:session.url})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
