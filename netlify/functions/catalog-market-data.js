import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const { data } = await supabase
.from("catalogs")
.select("id,title,price,volume,change")
.limit(100)

const market=(data||[]).map(c=>({

catalog_id:c.title,
price:c.price || 0,
volume:c.volume || 0,
change:c.change || 0

}))

return{
statusCode:200,
body:JSON.stringify({market})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
