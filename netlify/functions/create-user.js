import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(event){

 const body = JSON.parse(event.body);

 const { data } =
 await supabase.auth.admin.createUser({

  email:body.email,
  password:body.password

 });

 return {

  statusCode:200,
  body:JSON.stringify(data)

 };

}
