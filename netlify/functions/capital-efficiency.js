
export async function handler() {

  const ARR = 1200000;
  const totalCapitalRaised = 3000000;

  const capitalEfficiency =
    ARR / totalCapitalRaised;

  return {
    statusCode:200,
    body:JSON.stringify({
      ARR,
      totalCapitalRaised,
      capitalEfficiencyRatio: capitalEfficiency
    })
  };
}
