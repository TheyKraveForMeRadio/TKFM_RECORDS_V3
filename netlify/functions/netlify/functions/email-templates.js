export function getTemplate(type, data = {}) {
  const templates = {
    welcome: {
      subject: "Welcome to TKFM Records",
      body: `Welcome ${data.name || "Artist"} — your label access is live.`
    },
    credits_low: {
      subject: "Credits Running Low",
      body: `You are low on ${data.creditType}. Refill to keep engines active.`
    },
    trending: {
      subject: "You're Trending on TKFM 🔥",
      body: `Your track "${data.track}" is gaining traction on TKFM Radio.`
    },
    weekly_digest: {
      subject: "Your Weekly TKFM Performance",
      body: `
Streams: ${data.streams}
Revenue: $${data.revenue}
Top Track: ${data.topTrack}
      `
    },
    owner_broadcast: {
      subject: data.subject,
      body: data.message
    }
  };

  return templates[type];
}
