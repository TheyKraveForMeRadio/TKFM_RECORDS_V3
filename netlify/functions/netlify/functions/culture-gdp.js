export async function handler(event) {
  const { plays, revenue, creators } = JSON.parse(event.body);

  const GDP = (plays * 0.01) + revenue + (creators * 5);

  return {
    statusCode: 200,
    body: JSON.stringify({
      culture_gdp: GDP,
      unit: "TKFM-CBDC"
    })
  };
}
