import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const fan = event.queryStringParameters.fan

const { data } = await supabase
.from("catalog_investments")
.select("*")
.eq("investor",fan)

return{
statusCode:200,
body:JSON.stringify({
portfolio:data
})
}

}
