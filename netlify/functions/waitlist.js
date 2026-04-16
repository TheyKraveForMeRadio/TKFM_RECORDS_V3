import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { email, ref } = JSON.parse(event.body);

    // SAVE USER
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "apikey": process.env.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    // SAVE REFERRAL
    if (ref) {
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/referral_logs`, {
        method: "POST",
        headers: {
          "apikey": process.env.SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          referrer: ref,
          referred: email
        })
      });

      // UPDATE STATS
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/increment_invites`, {
        method: "POST",
        headers: {
          "apikey": process.env.SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_email: ref })
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
