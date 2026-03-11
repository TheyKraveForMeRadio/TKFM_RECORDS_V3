
export async function handler() {

  const start = Date.now();

  await new Promise(r=>setTimeout(r,100));

  const duration = Date.now()-start;

  return {
    statusCode:200,
    body:JSON.stringify({
      responseTimeMs:duration
    })
  };
}
