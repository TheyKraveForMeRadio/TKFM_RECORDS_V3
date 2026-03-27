exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      SUPABASE_URL: process.env.SUPABASE_URL || null,
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? "EXISTS" : null,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "EXISTS" : null
    })
  };
};
