import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async()=>{

 const { data } = await supabase
 .from("payments")
 .select("*")
 .order("timestamp",{ascending:false})
 .limit(100);

 return{
  statusCode:200,
  body:JSON.stringify(data)
 };

};
