import Redis from "ioredis";

let redis;

function getRedis() {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL, {
      tls: {},
      maxRetriesPerRequest: 3
    });
  }
  return redis;
}

export async function cacheGet(key) {
  const r = getRedis();
  const value = await r.get(key);
  if (!value) return null;
  return JSON.parse(value);
}

export async function cacheSet(key, value, ttl = 60) {
  const r = getRedis();
  await r.set(key, JSON.stringify(value), "EX", ttl);
}

export async function cacheDelete(key) {
  const r = getRedis();
  await r.del(key);
}
