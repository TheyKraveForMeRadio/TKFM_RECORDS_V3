export async function handler() {

  const templates = [
    {
      name:"CCAR Severe",
      GDP:-0.06,
      Unemployment:+0.05,
      MarketCrash:-0.4
    },
    {
      name:"EBA Adverse",
      GDP:-0.04,
      InterestRate:+0.02,
      CreditSpread:+0.03
    }
  ];

  return {
    statusCode:200,
    body:JSON.stringify({
      templates,
      description:"Regulatory macro stress templates"
    })
  };
}
