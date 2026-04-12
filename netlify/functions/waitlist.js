const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, ref } = body;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Missing email" })
      };
    }

    // Save waitlist
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) throw error;

    // Save referral if exists
    if (ref) {
      await supabase.from('referrals').insert([
        {
          referrer: ref,
          referred: email
        }
      ]);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error("WAITLIST ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: err.message
      })
    };
  }
};
