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
        body: JSON.stringify({ success: false, error: "No email" }),
      };
    }

    // 🔥 GENERATE USER REF CODE
    const user_ref = Math.random().toString(36).substring(2, 8);

    const { error } = await supabase
      .from("waitlist")
      .insert([
        {
          email,
          ref_by: ref || null,
          ref_code: user_ref,
          created_at: new Date().toISOString(),
        },
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
        ref_code: user_ref,
      }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Server error" }),
    };
  }
};
