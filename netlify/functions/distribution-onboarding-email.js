const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const email = body.email;
    const planId = body.planId || "distribution_single_release";

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing client email",
        }),
      };
    }

    const planMap = {
      distribution_single_release: "Distribution - Single Release",
      distribution_artist_monthly: "Distribution - Artist Monthly",
      distribution_label_monthly: "Distribution - Label Monthly",
    };

    const planName = planMap[planId] || planId;

    await resend.emails.send({
      from: "TKFM Records <noreply@tkfmrecords.com>",
      to: email,
      subject: "Your Distribution Intake Has Started",
      html: `
        <div style="font-family: Arial; background:#020617; color:#ffffff; padding:40px;">
          <h1 style="color:#facc15;">TKFM Distribution Intake Started</h1>

          <p>Your payment was successfully received.</p>

          <p><strong>Plan:</strong> ${planName}</p>

          <p>
            Your release is now entering our distribution pipeline:
          </p>

          <p>
            Intake → Metadata Review → Artwork Validation →
            DSP Delivery → Release Scheduling → Live Distribution
          </p>

          <p>
            Our team will contact you with onboarding steps,
            metadata collection, and release scheduling.
          </p>

          <p>
            Thank you for building with TKFM Records.
          </p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch (error) {
    console.error("EMAIL ERROR:", error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
