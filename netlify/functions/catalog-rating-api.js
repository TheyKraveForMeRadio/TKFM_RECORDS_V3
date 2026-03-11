import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const catalog_id = event.queryStringParameters?.catalog_id

const { data } = await supabase
.from("catalog_ratings")
.select("*")
.eq("catalog_id",catalog_id)
.order("created_at",{ascending:false})
.limit(1)

return {
statusCode:200,
body:JSON.stringify({
rating:data?.[0]
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
