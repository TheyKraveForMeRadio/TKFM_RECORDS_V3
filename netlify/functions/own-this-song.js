import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const body=JSON.parse(event.body||"{}")

const catalogId=body.catalog_id
const amount=body.amount || 50

// create investment order

await supabase.from("catalog_orders").insert({
catalog_id:catalogId,
side:"buy",
price:amount,
quantity:1,
source:"own_song_button"
})

// record investor portfolio

await supabase.from("fan_portfolio").insert({
catalog_id:catalogId,
investment:amount,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
success:true
})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({
success:false,
error:err.message
})
}

}

}
