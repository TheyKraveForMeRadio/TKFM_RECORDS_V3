import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

 const { data } =
 await supabase
 .from("catalog_investments")
 .select("amount")

 let capital = 0

 for(const i of data || []){
  capital += i.amount || 0
 }

 return{
  statusCode:200,
  body:JSON.stringify({
   total_invested:capital
  })
 }

}
