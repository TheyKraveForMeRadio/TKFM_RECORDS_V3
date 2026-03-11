import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_ANON_KEY
);

export async function handler(event){

 const body = JSON.parse(event.body);

 const { data } =
 await supabase.auth.signInWithPassword({

  email:body.email,
  password:body.password

 });

 return {

  statusCode:200,
  body:JSON.stringify({

   token:data.session.access_token

  })

 };

}
