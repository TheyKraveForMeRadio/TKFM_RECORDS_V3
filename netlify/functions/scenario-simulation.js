
export async function handler() {

  const baseMRR = 50000;

  const scenarios = [
    { name:"Conservative", growth:0.05 },
    { name:"Balanced", growth:0.10 },
    { name:"Aggressive", growth:0.20 }
  ];

  const projections = scenarios.map(s => {

    let mrr = baseMRR;

    for(let i=0;i<12;i++)
      mrr *= (1+s.growth);

    return {
      scenario:s.name,
      projectedARR: Math.round(mrr*12)
    };
  });

  return {
    statusCode:200,
    body:JSON.stringify(projections)
  };
}
