export async function handler() {

  const xbrl = {
    taxonomy:"BaselIII-Pillar1",
    facts:[
      { concept:"CET1Capital", context:"CurrentPeriod", unit:"USD", value:800000 },
      { concept:"TotalCapital", context:"CurrentPeriod", unit:"USD", value:1000000 },
      { concept:"RiskWeightedAssets", context:"CurrentPeriod", unit:"USD", value:500000 },
      { concept:"CapitalAdequacyRatio", context:"CurrentPeriod", unit:"Percent", value:16 }
    ],
    filingStatus:"Draft"
  };

  return {
    statusCode:200,
    body:JSON.stringify(xbrl)
  };
}
