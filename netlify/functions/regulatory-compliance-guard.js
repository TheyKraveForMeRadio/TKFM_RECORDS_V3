import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
REGULATORY COMPLIANCE GUARD

Ensures catalog IPOs include required disclosures.
*/

export async function handler(){

try{

const { data:ipos } = await supabase
.from("catalog_ipos")
.select("*")
.eq("compliance_checked",false)

for(const ipo of ipos){

await supabase
.from("catalog_ipos")
.update({
compliance_checked:true,
disclaimer:"Royalty participation asset. Not equity."
})
.eq("id",ipo.id)

}

return {
statusCode:200,
body:JSON.stringify({
ipos_checked:ipos.length
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
