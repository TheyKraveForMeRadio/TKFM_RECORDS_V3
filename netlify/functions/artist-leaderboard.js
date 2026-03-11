import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data } = await supabase
.from("artists")
.select("id,name,market_cap")
.order("market_cap",{ascending:false})
.limit(50)

return{
statusCode:200,
body:JSON.stringify({
artists:data || []
})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
