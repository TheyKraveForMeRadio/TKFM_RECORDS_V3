import bus from "./_event-bus.js";
import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const body = JSON.parse(event.body)

const apiKey = crypto.randomBytes(32).toString("hex")

await supabase
.from("developer_keys")
.insert({
developer: body.developer,
api_key: apiKey,
created_at: new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
api_key: apiKey
})
}

}
