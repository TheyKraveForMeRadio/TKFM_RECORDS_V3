import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* LOAD STREAM EVENTS */

const { data:events } = await supabase
.from("streaming_revenue_events")
.select("*")

for(const event of events || []){

/* LOAD TOKEN HOLDERS */

const { data:holders } = await supabase
.from("token_holders")
.select("*")
.eq("token_id",event.track_id)

for(const holder of holders || []){

const payout =
Number(event.amount)*
(Number(holder.share_percent)/100)

await supabase
.from("royalty_distributions")
.insert({

track_id:event.track_id,
holder_id:holder.user_id,
amount:payout

})

}

}

return{

statusCode:200,
body:JSON.stringify({success:true})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
