import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

function generateReferralCode(name){
return name.toLowerCase().replace(/\s+/g,'') + Math.floor(Math.random()*10000)
}

export async function handler(event){

try{

const body = JSON.parse(event.body || "{}")

const artist_id = body.artist_id
const artist_name = body.artist_name
const referred_by = body.referred_by || null

if(!artist_id || !artist_name){
return {
statusCode:400,
body:JSON.stringify({error:"missing artist"})
}
}

const referral_code = generateReferralCode(artist_name)

await supabase
.from("artist_referrals")
.insert({
artist_id,
artist_name,
referral_code,
referred_by,
created_at:new Date().toISOString()
})

if(referred_by){

const {data:referrer} = await supabase
.from("artist_referrals")
.select("*")
.eq("referral_code",referred_by)
.single()

if(referrer){

await supabase
.from("referral_rewards")
.insert({
referrer_artist_id:referrer.artist_id,
referred_artist_id:artist_id,
reward_type:"artist_referral",
created_at:new Date().toISOString()
})

}

}

return {
statusCode:200,
body:JSON.stringify({
success:true,
referral_code,
referral_link:`https://tkfmrecords.com/join?ref=${referral_code}`
})
}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
