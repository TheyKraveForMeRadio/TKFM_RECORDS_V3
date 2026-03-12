import { cacheGet } from "./redis-cache.js";

export default async () => {

  const data = await cacheGet("market_data");

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    },
    body: `data: ${JSON.stringify(data || {})}\n\n`
  };
};
