import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const catalog_id = event.queryStringParameters?.catalog_id

const { data:trades } = await supabase
.from('catalog_trades')
.select('*')
.eq('catalog_id',catalog_id)
.order('created_at',{ascending:false})
.limit(1)

const price = trades?.[0]?.price || 0

return {
statusCode:200,
body:JSON.stringify({
catalog_id,
price
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
