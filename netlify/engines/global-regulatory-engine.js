import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try{

/* LOAD LEDGER */

const { data: ledger } = await supabase
.schema("finance")
.from("platform_ledger")
.select("*")

let taxRecords = {}

for(const tx of ledger || []){

if(!taxRecords[tx.entity_id]){
taxRecords[tx.entity_id] = 0
}

taxRecords[tx.entity_id] += Number(tx.amount || 0)

}

/* STORE TAX REPORTS */

for(const user in taxRecords){

await supabase
.from("tax_reports")
.insert({

user_id:user,
annual_income:taxRecords[user]

})

}

return{

statusCode:200,

body:JSON.stringify({

reports_generated:Object.keys(taxRecords).length

})

}

}catch(err){

return{

statusCode:500,
body:JSON.stringify({error:err.message})

}

}

}
