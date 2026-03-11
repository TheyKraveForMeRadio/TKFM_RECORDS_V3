import { createClient } from '@supabase/supabase-js'

const supabase=createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const id=event.queryStringParameters.id

const { data } = await supabase
.from("catalog_price_history")
.select("price,created_at")
.eq("catalog_id",id)
.order("created_at",{ascending:true})
.limit(50)

const history=(data||[]).map(row=>({
time:new Date(row.created_at).toLocaleTimeString(),
price:row.price
}))

return{
statusCode:200,
body:JSON.stringify({history})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
