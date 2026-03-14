import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const key = event.headers["x-api-key"]

const { data } =
await supabase
.from("developer_keys")
.select("*")
.eq("api_key",key)
.single()

if(!data){
return{
statusCode:401,
body:"Invalid API Key"
}
}

return{
statusCode:200,
body:JSON.stringify({
authorized:true
})
}

}
