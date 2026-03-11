import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

/*
TKFM EVENT BUS

Central event system for the entire platform.

All engines emit events here instead of calling each other.

Example events:

TRACK_UPLOADED
CATALOG_CREATED
STREAM_RECORDED
ROYALTY_GENERATED
IPO_LAUNCHED
CATALOG_TRADE_EXECUTED
*/

async function emitEvent(type, payload){

const { data, error } = await supabase
.from('tkfm_events')
.insert({
event_type:type,
payload,
created_at:new Date().toISOString()
})

if(error){
throw new Error(error.message)
}

return data
}

async function getEvents(type){

let query = supabase
.from('tkfm_events')
.select('*')
.order('created_at',{ascending:false})
.limit(50)

if(type){
query = query.eq('event_type',type)
}

const { data, error } = await query

if(error){
throw new Error(error.message)
}

return data
}

export async function handler(event){

try{

const method = event.httpMethod

if(method === "POST"){

const body = JSON.parse(event.body || "{}")

const type = body.type
const payload = body.payload || {}

if(!type){
return {
statusCode:400,
body:JSON.stringify({error:"event type required"})
}
}

const result = await emitEvent(type,payload)

return {
statusCode:200,
body:JSON.stringify({
success:true,
event:type,
result
})
}

}

if(method === "GET"){

const type = event.queryStringParameters?.type

const events = await getEvents(type)

return {
statusCode:200,
body:JSON.stringify({
events
})
}

}

return {
statusCode:405,
body:"method not allowed"
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
