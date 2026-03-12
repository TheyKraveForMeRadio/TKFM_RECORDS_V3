import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

try{

const body = JSON.parse(event.body || "{}")

const {
artist_id,
song_title,
total_shares,
ipo_price
} = body

/* CREATE TOKEN */

const { data: token } = await supabase
.from("catalog_tokens")
.insert({

artist_id,
name:song_title,
price:ipo_price,
total_supply:total_shares,
ipo_price:ipo_price,
ipo_status:"open"

})
.select()
.single()

/* RECORD IPO */

await supabase
.from("catalog_ipos")
.insert({

token_id:token.id,
artist_id,
price:ipo_price,
shares_available:total_shares,
shares_sold:0,
status:"open"

})

return{

statusCode:200,

body:JSON.stringify({

success:true,
token_id:token.id,
ipo_price:ipo_price,
shares:total_shares

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
