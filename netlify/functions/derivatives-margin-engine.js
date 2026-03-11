import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
DERIVATIVES MARGIN ENGINE

Calculates margin requirements
for derivatives contracts.
*/

async function calculateMargin(){

const { data:contracts } = await supabase
.from("music_derivatives_contracts")
.select("*")

if(!contracts) return

for(const c of contracts){

const margin = c.contract_value * 0.1

await supabase
.from("derivatives_margin")
.insert({
contract_id:c.id,
margin_required:margin,
created_at:new Date().toISOString()
})

}

}

export async function handler(){

try{

await calculateMargin()

return {
statusCode:200,
body:JSON.stringify({status:"margin calculated"})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
