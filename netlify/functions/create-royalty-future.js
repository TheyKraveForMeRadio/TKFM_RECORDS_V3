import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

try{

const body = JSON.parse(event.body)

const catalog_id = body.catalog_id
const expected_streams = body.expected_streams
const payout_rate = body.payout_rate
const expiry = body.expiry

const value = expected_streams * payout_rate

const { data } = await supabase
.from("royalty_futures")
.insert({
catalog_id,
expected_streams,
payout_rate,
expiry,
contract_value:value
})
.select()
.single()

return {
statusCode:200,
body:JSON.stringify(data)
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
