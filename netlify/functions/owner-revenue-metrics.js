import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:transactions } = await supabase
.from("transactions")
.select("*")
.order("created_at",{ascending:false})
.limit(10)

const { data:revenue } = await supabase
.from("platform_revenue")
.select("amount")

let totalRevenue = 0
revenue?.forEach(r=> totalRevenue += r.amount)

const { data:volume } = await supabase
.from("transactions")
.select("amount")

let totalVolume = 0
volume?.forEach(v=> totalVolume += v.amount)

const { count:artists } = await supabase
.from("artists")
.select("*",{count:"exact",head:true})

const { count:investors } = await supabase
.from("fan_portfolio")
.select("*",{count:"exact",head:true})

return {
statusCode:200,
body:JSON.stringify({

revenue:totalRevenue,
volume:totalVolume,
artists,
investors,
transactions

})

}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
