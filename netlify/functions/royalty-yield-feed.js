import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:catalogs } = await supabase
.from("catalogs")
.select("royalty_yield")

let totalYield = 0

for(const c of catalogs){
totalYield += c.royalty_yield || 0
}

const avgYield = totalYield / catalogs.length

return {
statusCode:200,
body:JSON.stringify({
average_yield:avgYield
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
