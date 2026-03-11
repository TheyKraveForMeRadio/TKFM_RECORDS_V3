import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
DERIVATIVES RISK ENGINE

Tracks systemic risk in the derivatives market.
*/

export async function handler(){

try{

const { data:contracts } = await supabase
.from("music_derivatives_contracts")
.select("*")

let totalExposure = 0

for(const c of contracts){

totalExposure += c.contract_value

}

return {
statusCode:200,
body:JSON.stringify({
total_exposure:totalExposure
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
