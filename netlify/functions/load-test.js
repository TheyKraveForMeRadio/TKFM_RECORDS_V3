export async function handler() {

  if (process.env.NODE_ENV === 'production' && process.env.DEBUG_MODE === 'true') {
    return { statusCode:403, body:"Debug disabled in production" };
  }

  const start = Date.now();

  const promises = [];

  for(let i=0;i<50;i++) {
    promises.push(
      fetch(process.env.SELF_BASE_URL + '/.netlify/functions/metrics-engine')
    );
  }

  await Promise.all(promises);

  const duration = Date.now() - start;

  return {
    statusCode:200,
    body:JSON.stringify({
      concurrentRequests:50,
      totalTimeMs:duration
    })
  };
}
