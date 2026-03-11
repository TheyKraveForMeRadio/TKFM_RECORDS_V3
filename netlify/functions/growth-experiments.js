
export async function handler() {

  const experiments = [
    {
      name:"Increase SaaS price 5%",
      expectedImpact:"+3% MRR",
      risk:"Low"
    },
    {
      name:"Introduce annual plan",
      expectedImpact:"+12% cash flow",
      risk:"Medium"
    },
    {
      name:"Add enterprise upsell",
      expectedImpact:"+18% expansion revenue",
      risk:"Medium"
    }
  ];

  return {
    statusCode:200,
    body:JSON.stringify(experiments)
  };
}
