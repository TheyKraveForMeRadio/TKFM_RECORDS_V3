const { client } = require("./_supabase");
const fetch = require("node-fetch");

exports.handler = async () => {

  try{

    const { data: emails } = await client
      .from("waitlist")
      .select("email");

    for(const e of emails){

      await fetch("https://api.resend.com/emails",{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          from:"TKFM <onboarding@resend.dev>",
          to:e.email,
          subject:"🚀 You're Early — Start Trading Now",
          html: `
            <h2>You're invited to TKFM</h2>
            <p>Trade music like stocks. Use AI. Win money.</p>
            <a href="https://www.tkfmrecords.com">
              👉 Enter Platform
            </a>
          `
        })
      });

    }

    return {
      statusCode:200,
      body: JSON.stringify({ sent:true })
    };

  }catch(err){
    return {
      statusCode:200,
      body: JSON.stringify({ error: err.message })
    };
  }

};
