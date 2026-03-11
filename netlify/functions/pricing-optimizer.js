
export async function handler() {

  const churnRate = 0.03;
  const growthRate = 0.12;

  let recommendation = "Maintain pricing";

  if(growthRate > 0.15 && churnRate < 0.05)
    recommendation = "Increase pricing by 5-10%";

  if(churnRate > 0.07)
    recommendation = "Reduce entry price or improve value";

  return {
    statusCode:200,
    body:JSON.stringify({
      churnRate,
      growthRate,
      recommendation
    })
  };
}
