
export async function handler() {

  const campaigns = [
    { channel:"Paid Ads", budget:20000, expectedROI:1.8 },
    { channel:"Affiliate", budget:10000, expectedROI:2.5 },
    { channel:"Content", budget:5000, expectedROI:3.2 }
  ];

  const recommended = campaigns
    .sort((a,b)=>b.expectedROI - a.expectedROI)[0];

  return {
    statusCode:200,
    body:JSON.stringify({
      campaigns,
      recommendedChannel: recommended.channel
    })
  };
}
