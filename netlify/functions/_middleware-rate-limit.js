import { cacheGet, cacheSet } from "./redis-cache.js";

const LIMIT = 60;        // requests
const WINDOW = 60;       // seconds

export default async (request, context) => {

  const ip =
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";

  const key = "rate:" + ip;

  let count = await cacheGet(key);

  if (!count) {
    await cacheSet(key, 1, WINDOW);
    return;
  }

  if (count >= LIMIT) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded" }),
      {
        status: 429,
        headers: { "content-type": "application/json" }
      }
    );
  }

  await cacheSet(key, count + 1, WINDOW);
};
