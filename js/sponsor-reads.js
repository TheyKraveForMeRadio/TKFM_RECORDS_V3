exports.handler = async (event) => {
  try {
    const { artistEmail, packType } = JSON.parse(event.body || "{}");
    if (!artistEmail || !packType) return { statusCode: 400, body: "Missing parameters" };

    const readUrl = `https://tkfmrecords.com/sponsor/${Date.now()}-${packType}.mp3`;

    return { statusCode: 200, body: JSON.stringify({ success: true, url: readUrl }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
