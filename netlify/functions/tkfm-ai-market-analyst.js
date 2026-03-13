import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

const { data: tokens } = await supabase
.from("catalog_tokens")
.select("*")

const reports=[]

for(const t of tokens || []){

const price = Number(t.price || 0)

let rating="hold"

if(price < 1) rating="undervalued"
if(price > 10) rating="overvalued"

reports.push({

token_id:t.id,
price,
rating

})

}

return{

statusCode:200,
body:JSON.stringify({reports})

}

}catch(e){

return{
statusCode:500,
body:JSON.stringify({error:e.message})
}

}

}
