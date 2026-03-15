import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event,context)=>{

try{

const { data, error } = await supabase
.from("catalog_market")
.select("*")
.limit(100)

if(error){
throw error
}

return{
statusCode:200,
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
market:data || []
})
}

}catch(err){

return{
statusCode:200,
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
market:[],
error:err.message
})
}

}

}
