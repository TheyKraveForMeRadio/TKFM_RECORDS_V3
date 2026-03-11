export async function handler() {

  if (process.env.NODE_ENV === 'production' && process.env.DEBUG_MODE === 'true') {
    return { statusCode:403, body:"Debug disabled in production" };
  }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if(!key) {
    return {
      statusCode:500,
      body:"Service role missing"
    };
  }

  if(key.includes('anon')) {
    return {
      statusCode:500,
      body:"Service role key incorrectly configured"
    };
  }

  return {
    statusCode:200,
    body:"Service role key secured"
  };
}
