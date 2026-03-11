
export async function handler() {

  const currentMRR = 50000;
  const growthRate = 0.08;

  const forecast = [];

  let mrr = currentMRR;

  for(let i=1;i<=12;i++) {
    mrr = mrr*(1+growthRate);
    forecast.push({
      month:i,
      projectedMRR:Math.round(mrr)
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify({
      currentMRR,
      forecast
    })
  };
}
