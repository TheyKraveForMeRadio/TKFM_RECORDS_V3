import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
CREATOR APP MARKETPLACE

Allows developers to build apps
for creator economies.
*/

export async function handler(){

try{

const { data } = await supabase
.from("creator_apps")
.select("*")

return {
statusCode:200,
body:JSON.stringify({
apps:data
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
