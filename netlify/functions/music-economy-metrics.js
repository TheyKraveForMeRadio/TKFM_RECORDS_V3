import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data:transactions } = await supabase
.from("transactions")
.select("amount")

let invested=0

transactions?.forEach(t=>{
invested+=t.amount
})

const { count:songs } = await supabase
.from("catalogs")
.select("*",{count:"exact",head:true})

const { count:fans } = await supabase
.from("fan_portfolio")
.select("*",{count:"exact",head:true})

return{
statusCode:200,
body:JSON.stringify({
invested,
songs,
fans
})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
