import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:allocations } = await supabase
.from("sovereign_fund_allocations")
.select("*")
.limit(100)

for(const a of allocations){

await supabase.from("catalog_orders").insert({
catalog_id:a.catalog_id,
side:"buy",
price:1,
quantity:a.capital_allocated / 1,
source:"sovereign_fund"
})

}

return {
statusCode:200,
body:JSON.stringify({status:"capital injected"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
