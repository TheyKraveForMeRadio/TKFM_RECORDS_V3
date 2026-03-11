import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(){

try{

const events=[
{message:"🔥 Fan bought shares in Midnight Drive"},
{message:"🎧 Artist uploaded a new song"},
{message:"📈 Song price increased"},
{message:"💰 Royalty payout distributed"}
]

return{
statusCode:200,
body:JSON.stringify({
events
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
