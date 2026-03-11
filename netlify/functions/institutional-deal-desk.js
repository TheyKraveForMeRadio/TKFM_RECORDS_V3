import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
INSTITUTIONAL DEAL DESK

Tracks deals between institutions
and music catalog owners.
*/

export async function handler(){

try{

const { data } = await supabase
.from("catalog_deals")
.select("*")
.order("deal_size",{ascending:false})

return {
statusCode:200,
body:JSON.stringify({
deals:data
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
