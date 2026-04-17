import { supabase } from './_supabase.js';

export const handler = async (event) => {
  try {
    // accept multiple input styles
    const user =
      event.queryStringParameters?.user ||
      (event.body ? JSON.parse(event.body).user : null);

    // fallback for testing (REMOVE later if needed)
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
      .single();

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
