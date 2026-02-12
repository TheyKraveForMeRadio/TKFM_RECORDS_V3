export async function handler(event) {
  const data = JSON.parse(event.body);

  const rev = await fetch(process.env.URL + "/.netlify/functions/revenue-predict", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(r=>r.json());

  const pricing = await fetch(process.env.URL + "/.netlify/functions/auto-pricing", {
    method: "POST",
    body: JSON.stringify({ email: data.email, projectedRevenue: rev.projectedMonthlyUSD })
  }).then(r=>r.json());

  return {
    statusCode: 200,
    body: JSON.stringify({
      autonomous: true,
      revenue: rev,
      pricing
    })
  };
}
