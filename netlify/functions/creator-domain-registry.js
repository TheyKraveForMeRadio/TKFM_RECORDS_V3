import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
CREATOR DOMAIN REGISTRY

Registers creator domains.
Example:
artist.tkfm
label.tkfm
*/

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const { data } = await supabase
.from("creator_domains")
.insert({
creator_id:body.creator_id,
domain:body.domain,
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
