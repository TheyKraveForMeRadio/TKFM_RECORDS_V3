import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

const { data:catalogs } =
await supabase
.from("catalog_registry")
.select("*")

const allocations=[]

for(const c of catalogs || []){

allocations.push({
catalog_id:c.catalog_id,
allocation:Math.random()*100
})

}

return{
statusCode:200,
body:JSON.stringify(allocations)
}

}
