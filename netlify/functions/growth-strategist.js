
export async function handler() {

  const metrics = {
    churn:0.04,
    NRR:112,
    growthRate:0.1
  };

  const actions = [];

  if(metrics.NRR < 110)
    actions.push("Focus on expansion revenue");

  if(metrics.churn > 0.05)
    actions.push("Improve onboarding experience");

  if(metrics.growthRate < 0.15)
    actions.push("Increase acquisition budget");

  return {
    statusCode:200,
    body:JSON.stringify({
      metrics,
      recommendedActions:actions
    })
  };
}
