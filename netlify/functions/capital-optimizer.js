
export async function handler() {

  const capital = 1000000;

  const allocation = {
    acquisition: capital * 0.40,
    productDevelopment: capital * 0.25,
    retention: capital * 0.20,
    infrastructure: capital * 0.15
  };

  return {
    statusCode:200,
    body:JSON.stringify({
      totalCapital: capital,
      allocation
    })
  };
}
