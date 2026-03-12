import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

try{

const token =
event.queryStringParameters?.token_id || "song123"

const { data } = await supabase
.from("catalog_price_history")
.select("*")
.eq("token_id",token)
.order("created_at",{ascending:true})
.limit(200)

const candles = (data||[]).map(p=>({

t:new Date(p.created_at).getTime(),
o:Number(p.open),
h:Number(p.high),
l:Number(p.low),
c:Number(p.close)

}))

return{
statusCode:200,
body:JSON.stringify({candles})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
