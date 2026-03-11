import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:loans } = await supabase
.from("music_credit_loans")
.select("*")
.eq("status","active")

for(const loan of loans){

const payment = loan.amount * 0.02

await supabase
.from("music_credit_loans")
.update({
amount:loan.amount - payment
})
.eq("id",loan.id)

}

return {
statusCode:200,
body:JSON.stringify({status:"repayments processed"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
