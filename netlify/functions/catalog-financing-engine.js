import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
CATALOG FINANCING ENGINE

Issues loans or financing to
catalog owners after underwriting.
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const { data } = await supabase
.from("catalog_financing")
.insert({
catalog_id:body.catalog_id,
borrower:body.borrower,
amount:body.amount,
interest_rate:0.10,
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
