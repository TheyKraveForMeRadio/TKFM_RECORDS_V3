const rateLimitStore = {};

export function rateLimit(ip, limit = 60, windowMs = 60000) {

  const now = Date.now();

  if(!rateLimitStore[ip]) {
    rateLimitStore[ip] = [];
  }

  rateLimitStore[ip] =
    rateLimitStore[ip].filter(t => now - t < windowMs);

  if(rateLimitStore[ip].length >= limit) {
    return false;
  }

  rateLimitStore[ip].push(now);
  return true;
}
