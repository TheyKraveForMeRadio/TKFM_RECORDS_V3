
export async function handler() {

  const regions = [
    { name:"North America", base:60000, growth:0.12 },
    { name:"Europe", base:40000, growth:0.15 },
    { name:"Asia-Pacific", base:30000, growth:0.20 }
  ];

  const forecast = regions.map(r => {

    let revenue = r.base;

    for(let i=0;i<12;i++)
      revenue *= (1+r.growth);

    return {
      region:r.name,
      projectedAnnualRevenue:Math.round(revenue)
    };
  });

  return {
    statusCode:200,
    body:JSON.stringify(forecast)
  };
}
