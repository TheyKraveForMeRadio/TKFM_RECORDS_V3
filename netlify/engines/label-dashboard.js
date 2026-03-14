import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const label = event.queryStringParameters.label

const { data } =
await supabase
.from("label_artists")
.select("*")
.eq("label",label)

return{
 statusCode:200,
 body:JSON.stringify(data||[])
}

}
