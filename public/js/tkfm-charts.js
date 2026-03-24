export async function loadChart(catalog_id){

  const res = await fetch("/.netlify/functions/engine/get-trades?catalog_id=" + catalog_id);
  const data = await res.json();

  const trades = data.trades || [];

  const labels = trades.map(t => new Date(t.timestamp).toLocaleTimeString()).reverse();
  const prices = trades.map(t => t.price).reverse();

  const ctx = document.getElementById("chart").getContext("2d");

  if(window.tkfmChart){
    window.tkfmChart.destroy();
  }

  window.tkfmChart = new Chart(ctx,{
    type:"line",
    data:{
      labels,
      datasets:[{
        label:"Price",
        data:prices,
        tension:0.4,
        fill:true
      }]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{display:false}
      },
      scales:{
        x:{display:false},
        y:{beginAtZero:false}
      }
    }
  });

}
