export async function handler() {

  const riskIndicators = {
    CAR:9,
    LCR:95,
    NSFR:110
  };

  let actions = [];

  if(riskIndicators.CAR < 10)
    actions.push("Raise additional capital buffer");

  if(riskIndicators.LCR < 100)
    actions.push("Increase high-quality liquid assets");

  if(riskIndicators.NSFR < 100)
    actions.push("Stabilize funding profile");

  return {
    statusCode:200,
    body:JSON.stringify({
      riskIndicators,
      recommendedSupervisoryActions:actions
    })
  };
}
