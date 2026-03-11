
export async function handler() {

  const beta = 0.99;
  const alpha = 0.33;
  const delta = 0.025;

  const capital = 1000;
  const labor = 100;

  const output =
    Math.pow(capital, alpha) *
    Math.pow(labor, 1-alpha);

  const investment =
    delta * capital;

  const consumption =
    output - investment;

  return {
    statusCode:200,
    body:JSON.stringify({
      output,
      investment,
      consumption
    })
  };
}
