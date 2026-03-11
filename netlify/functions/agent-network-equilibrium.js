
export async function handler() {

  const agents = 20;
  const connections = [];

  for (let i = 0; i < agents; i++) {
    connections[i] = [];
    for (let j = 0; j < agents; j++) {
      connections[i][j] = i === j ? 0 : Math.random() * 0.5;
    }
  }

  let capital = Array(agents).fill(1000);

  for (let t = 0; t < 50; t++) {
    capital = capital.map((c, i) => {
      let inflow = 0;
      for (let j = 0; j < agents; j++) {
        inflow += capital[j] * connections[j][i] * 0.001;
      }
      return c + inflow - (c * 0.002);
    });
  }

  const equilibriumCapital =
    capital.reduce((a,b)=>a+b,0);

  return {
    statusCode:200,
    body:JSON.stringify({
      agents,
      equilibriumCapital,
      averageCapital:equilibriumCapital/agents
    })
  };
}
