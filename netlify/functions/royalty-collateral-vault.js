import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
ROYALTY COLLATERAL VAULT

Artists can deposit music catalogs as collateral
to secure credit lines or advances.

Collateral value is based on:
streaming revenue
royalty yield
catalog market cap
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const catalog_id = body.catalog_id
const owner = body.owner
const valuation = body.valuation

if(!catalog_id){
return {
statusCode:400,
body:JSON.stringify({error:"catalog_id required"})
}
}

const { data } = await supabase
.from("royalty_collateral_vault")
.insert({
catalog_id,
owner,
valuation,
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
