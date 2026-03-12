import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

try{

const body = JSON.parse(event.body || "{}")

const { user_id, action, amount } = body

/* GET WALLET */

const { data: wallet } = await supabase
.from("investor_wallets")
.select("*")
.eq("user_id",user_id)
.single()

let balance = wallet?.balance || 0

/* DEPOSIT */

if(action === "deposit"){

balance += Number(amount)

await supabase
.from("investor_wallets")
upsert({

user_id,
balance

})

}

/* WITHDRAW */

if(action === "withdraw"){

if(balance >= amount){

balance -= Number(amount)

await supabase
.from("investor_wallets")
.update({balance})
.eq("user_id",user_id)

}

}

/* PORTFOLIO VALUE */

const { data: holdings } = await supabase
.from("token_holders")
.select("*")
.eq("user_id",user_id)

let portfolioValue = 0

for(const h of holdings || []){

const { data: token } = await supabase
.from("catalog_tokens")
.select("*")
.eq("id",h.token_id)
.single()

portfolioValue +=
Number(token.price || 0) *
Number(h.quantity || 0)

}

return{

statusCode:200,

body:JSON.stringify({

balance,
portfolio_value:portfolioValue

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
