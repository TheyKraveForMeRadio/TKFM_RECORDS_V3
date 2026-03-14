import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

try{

const body = JSON.parse(event.body || "{}")
const user_id = body.user_id

/* LOAD HOLDINGS */

const { data: holdings } = await supabase
.from("token_holders")
.select("*")
.eq("user_id",user_id)

let portfolio = []
let portfolioValue = 0

for(const h of holdings || []){

const { data: token } = await supabase
.from("catalog_tokens")
.select("*")
.eq("id",h.token_id)
.single()

const price = Number(token.price || 0)
const qty = Number(h.quantity || 0)

const value = price * qty

portfolioValue += value

portfolio.push({

token_id:token.id,
song:token.name,
price:price,
quantity:qty,
value:value

})

}

/* ROYALTY INCOME */

const { data: royalties } = await supabase
.from("royalty_distributions")
.select("*")
.eq("holder_id",user_id)

let royaltyIncome = 0

for(const r of royalties || []){
royaltyIncome += Number(r.amount || 0)
}

/* CASH BALANCE */

const { data: wallet } = await supabase
.from("investor_wallets")
.select("*")
.eq("user_id",user_id)
.single()

const cash = wallet?.balance || 0

/* TOTAL NET WORTH */

const netWorth = cash + portfolioValue

return{

statusCode:200,

body:JSON.stringify({

cash_balance:cash,
portfolio_value:portfolioValue,
royalty_income:royaltyIncome,
net_worth:netWorth,
holdings:portfolio

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
