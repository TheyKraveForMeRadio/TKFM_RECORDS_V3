export default async (request, context) => {
  const url = new URL(request.url);

  // 🔁 LOOP BREAKER: never re-process Netlify internal requests
  if (
    url.pathname.startsWith("/.netlify/") ||
    request.headers.get("x-nf-edge-function")
  ) {
    return context.next();
  }

  // 🔓 ALWAYS ALLOW PUBLIC PAGES
  const PUBLIC_PATHS = [
    "/",
    "/index.html",
    "/contact.html",
    "/artist-dashboard.html",
    "/artist-dashboard-ai.html",
    "/label-home.html",
    "/label-hub.html"
  ];

  if (PUBLIC_PATHS.includes(url.pathname)) {
    return context.next();
  }

  // 🔐 PROTECTED ZONES ONLY
  const PROTECTED_PREFIXES = [
    "/owner",
    "/admin",
    "/secure",
    "/private"
  ];

  const isProtected = PROTECTED_PREFIXES.some(p =>
    url.pathname.startsWith(p)
  );

  if (!isProtected) {
    return context.next();
  }

  // 👑 OWNER OVERRIDE
  const ownerKey = request.headers.get("x-tkfm-owner");
  if (ownerKey === "TRUE") {
    return context.next();
  }

  // 🚫 HARD DENY (NO REDIRECT = NO LOOP)
  return new Response(
    "TKFM BLACKOUT MODE — ACCESS DENIED",
    {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
        "X-TKFM-MODE": "BLACKOUT"
      }
    }
  );
};
