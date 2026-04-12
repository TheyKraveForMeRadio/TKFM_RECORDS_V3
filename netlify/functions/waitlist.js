const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  try {
    // ✅ SAFE PARSE (fixes your error)
    const body = event.body ? JSON.parse(event.body) : {};
    const email = body.email;
    const ref = body.ref || null;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Email required" }),
      };
    }

    // ✅ SAVE WAITLIST
    await supabase.from("waitlist").insert([{ email }]);

    // ✅ SAVE REFERRAL (if exists)
    if (ref) {
      await supabase.from("referrals").insert([
        {
          referrer: ref,
          referred: email,
        },
      ]);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
