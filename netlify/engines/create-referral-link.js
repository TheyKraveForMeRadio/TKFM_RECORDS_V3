import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async(event)=>{

const body = JSON.parse(event.body)

const code = crypto.randomBytes(6).toString("hex")

await supabase
.from("artist_referrals")
.insert({
artist:body.artist,
referral_code:code,
created_at:new Date().toISOString()
})

return{
statusCode:200,
body:JSON.stringify({
referral_link:`https://tkfmrecords.com/join?ref=${code}`
})
}

}
