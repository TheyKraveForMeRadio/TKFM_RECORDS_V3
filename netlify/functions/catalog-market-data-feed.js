import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data } = await supabase
.from("catalog_price_history")
.select("*")
.order("timestamp",{ascending:false})
.limit(100)

return {
statusCode:200,
body:JSON.stringify({
market:data
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
