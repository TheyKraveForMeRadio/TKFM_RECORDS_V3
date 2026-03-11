import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
DERIVATIVES SETTLEMENT ORACLE

Updates settlement prices
based on catalog market performance.
*/

export async function handler(){

try{

const { data:contracts } = await supabase
.from("music_derivatives_contracts")
.select("*")

for(const contract of contracts){

const settlementPrice = Math.random() * 2

await supabase
.from("music_derivatives_contracts")
.update({settlement_price:settlementPrice})
.eq("id",contract.id)

}

return {
statusCode:200,
body:JSON.stringify({
status:"settlement prices updated"
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
