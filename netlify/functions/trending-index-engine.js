import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data } = await supabase
.from("catalog_price_history")
.select("catalog_id,price_change")
.order("price_change",{ascending:false})
.limit(20)

return {
statusCode:200,
body:JSON.stringify({
trending:data
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
