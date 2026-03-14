import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {

try{

const body = JSON.parse(event.body || "{}")

const {
platform,
track_id,
streams,
revenue
} = body

/* ---------------------------------
CALCULATE ESTIMATED ROYALTY
--------------------------------- */

let estimatedRevenue = revenue

if(!estimatedRevenue && streams){

if(platform==="spotify") estimatedRevenue = streams * 0.0035
if(platform==="apple") estimatedRevenue = streams * 0.007
if(platform==="youtube") estimatedRevenue = streams * 0.0008

}

/* ---------------------------------
INSERT STREAM EVENT
--------------------------------- */

const { data,error } = await supabase
.from("streaming_revenue_events")
.insert({

platform,
track_id,
streams,
amount: estimatedRevenue,
created_at:new Date()

})

if(error) throw error

return{

statusCode:200,

body:JSON.stringify({

success:true,
platform,
track_id,
streams,
revenue:estimatedRevenue

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
