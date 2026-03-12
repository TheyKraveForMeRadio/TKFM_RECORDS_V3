const BLOCKED_PATTERNS = [
"STRIPE_SECRET_KEY",
"SUPABASE_SERVICE_ROLE_KEY",
"DEPLOYER_PRIVATE_KEY",
"OWNER_PRIVATE_KEY",
"TKFM_DEPLOYER_PRIVATE_KEY",
"CLOUDINARY_API_SECRET",
"RESEND_API_KEY",
"PRIVATE_KEY"
];

function containsSecret(str){
if(!str) return false;

for(const p of BLOCKED_PATTERNS){
if(str.includes(p)) return true;
}

return false;
}

export default async (request, context) => {

const response = await context.next();

try{

const text = await response.text();

if(containsSecret(text)){

return new Response(
JSON.stringify({
error:"SecretGuard: blocked sensitive data"
}),
{
status:500,
headers:{ "content-type":"application/json" }
}
);

}

return new Response(text,{
status:response.status,
headers:response.headers
});

}catch(e){

return response;

}

};
