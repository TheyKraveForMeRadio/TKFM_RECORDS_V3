import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data } = await supabase
.from("fan_portfolio")
.select("catalog_id,investment")

const assets = (data || []).map(a=>({

song:a.catalog_id,
shares:1,
value:a.investment

}))

return{
statusCode:200,
body:JSON.stringify({
assets
})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({
error:err.message
})
}

}

}
