import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const body = JSON.parse(event.body)

const { data,error } =
await supabase
.from("catalog_investments")
.insert({
 fan:body.fan,
 catalog:body.catalog,
 shares:body.shares,
 price:body.price,
 created_at:new Date().toISOString()
})

if(error){
 return{
  statusCode:500,
  body:JSON.stringify(error)
 }
}

return{
 statusCode:200,
 body:JSON.stringify({
  status:"shares_purchased"
 })
}

}
