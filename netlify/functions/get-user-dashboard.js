const { supabase } = require('./_supabase');

exports.handler = async (event) => {
  try {
    const user =
      (event.queryStringParameters && event.queryStringParameters.user) ||
      (event.body ? JSON.parse(event.body).user : null);

    const testUser = user || "test@example.com";

    if (!testUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "missing user" })
      };
    }

    const { data, error } = await supabase
      .from('tkfm_artists')
      .select('*')
      .eq('email', testUser)
      .maybeSingle();

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
