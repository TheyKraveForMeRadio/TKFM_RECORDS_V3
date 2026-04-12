const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  try {
    const { email, ref } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false }),
      };
    }

    const ref_code = Math.random().toString(36).substring(2, 8);

    const { error } = await supabase
      .from("waitlist")
      .insert([
        {
          email,
          ref_code,
          ref_by: ref || null
        }
      ]);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        ref_code
      }),
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false }),
    };
  }
};
