export async function handler() {

  const requiredVars = [
    'STRIPE_SECRET_KEY',
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  const missing = requiredVars.filter(
    v => !process.env[v]
  );

  if(missing.length > 0) {
    return {
      statusCode:500,
      body:JSON.stringify({
        status:'ENVIRONMENT MISCONFIGURED',
        missing
      })
    };
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      status:'Environment OK',
      nodeEnv:process.env.NODE_ENV
    })
  };
}
