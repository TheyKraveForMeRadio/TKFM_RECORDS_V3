import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* LOAD USERS */

const { data: users } = await supabase
.from("investor_wallets")
.select("*")

let flagged = []

for(const u of users || []){

if(Number(u.balance || 0) > 1000000){

flagged.push({
user_id:u.user_id,
type:"large_balance"
})

}

}

/* STORE FLAGS */

for(const f of flagged){

await supabase
.from("compliance_flags")
.insert({

user_id:f.user_id,
flag_type:f.type

})

}

return{

statusCode:200,

body:JSON.stringify({

flags_created:flagged.length

})

}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
