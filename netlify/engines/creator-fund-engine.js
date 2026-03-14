import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

const { data:investments } =
await supabase
.from("creator_fund_investments")
.select("*")

let capital = 0

for(const i of investments || []){
capital += i.amount || 0
}

return{
statusCode:200,
body:JSON.stringify({
fund_capital:capital
})
}

}
