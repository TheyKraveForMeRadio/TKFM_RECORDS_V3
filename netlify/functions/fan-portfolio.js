import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async () => {

const user="demo-user"

const { data } = await supabase
.from("fan_portfolio")
.select("*")
.eq("user_id", user)

return {
statusCode:200,
body:JSON.stringify({
portfolio:data||[],
royalties:120
})
}

}
