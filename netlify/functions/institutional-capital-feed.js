import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data } = await supabase
.from("hedge_fund_positions")
.select("*")
.order("capital_allocated",{ascending:false})

let total = 0

for(const p of data){
total += p.capital_allocated
}

return {
statusCode:200,
body:JSON.stringify({
institutional_capital:total
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
