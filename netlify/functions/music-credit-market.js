import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
MUSIC CREDIT MARKET

Artists borrow against future royalties.

Loan value = % of catalog valuation.
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const catalog_id = body.catalog_id
const borrower = body.borrower
const amount = body.amount

const { data:collateral } = await supabase
.from("royalty_collateral_vault")
.select("*")
.eq("catalog_id",catalog_id)
.single()

if(!collateral){
return {
statusCode:400,
body:JSON.stringify({error:"collateral not found"})
}
}

const maxLoan = collateral.valuation * 0.5

if(amount > maxLoan){
return {
statusCode:400,
body:JSON.stringify({error:"loan exceeds collateral limit"})
}
}

const { data } = await supabase
.from("music_credit_loans")
.insert({
catalog_id,
borrower,
amount,
interest_rate:0.12,
status:"active",
created_at:new Date().toISOString()
})
.select()
.single()

return {
statusCode:200,
body:JSON.stringify(data)
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
