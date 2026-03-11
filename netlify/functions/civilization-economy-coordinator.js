import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
ECONOMY COORDINATOR

Synchronizes:
catalog markets
creator banks
royalty flows
*/

export async function handler(){

try{

const { data:royalties } = await supabase
.from("royalty_history")
.select("amount")

let totalRoyalties = 0

for(const r of royalties){
totalRoyalties += r.amount || 0
}

await supabase.from("civilization_economy").insert({
royalty_volume:totalRoyalties,
created_at:new Date().toISOString()
})

return {
statusCode:200,
body:JSON.stringify({
royalty_volume:totalRoyalties
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
