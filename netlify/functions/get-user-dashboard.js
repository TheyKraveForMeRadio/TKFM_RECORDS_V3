const { supabase } = require('./_supabase');

exports.handler = async (event) => {
  try {
    const user =
      (event.queryStringParameters && event.queryStringParameters.user) ||
      (event.body ? JSON.parse(event.body).user : null);

    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "missing user" })
      };
    }

    // 🔍 Try to find existing user
    let { data, error } = await supabase
      .from('tkfm_artists')
      .select('*')
      .eq('email', user)
      .maybeSingle();

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      };
    }

    // 🚀 AUTO-CREATE USER IF NOT FOUND
    if (!data) {
      const { data: newUser, error: insertError } = await supabase
        .from('tkfm_artists')
        .insert([
          {
            email: user,
            name: "New User",
            subscription_active: false,
            credits: {}
          }
        ])
        .select()
        .single();

      if (insertError) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: insertError.message })
        };
      }

      data = newUser;
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
