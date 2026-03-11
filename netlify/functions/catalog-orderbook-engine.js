import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const catalog_id = event.queryStringParameters?.catalog_id

if(!catalog_id){
return {
statusCode:400,
body:JSON.stringify({error:"catalog_id required"})
}
}

const { data:buyOrders } = await supabase
.from('catalog_orders')
.select('*')
.eq('catalog_id',catalog_id)
.eq('side','buy')
.order('price',{ascending:false})

const { data:sellOrders } = await supabase
.from('catalog_orders')
.select('*')
.eq('catalog_id',catalog_id)
.eq('side','sell')
.order('price',{ascending:true})

return {
statusCode:200,
body:JSON.stringify({
buy:buyOrders,
sell:sellOrders
})
}

}catch(err){
return {
statusCode:500,
body:JSON.stringify({error:err.message})
}
}

}
