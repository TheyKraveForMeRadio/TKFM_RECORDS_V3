import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
GLOBAL ASSET REGISTRY

Registers catalogs across sovereign networks.
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const { data } = await supabase
.from("global_music_assets")
.insert({
catalog_id:body.catalog_id,
origin_node:body.origin_node,
asset_type:"music_catalog",
created_at:new Date().toISOString()
})
.select()
.single()

return {
statusCode:200,
body:JSON.stringify(data)
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
