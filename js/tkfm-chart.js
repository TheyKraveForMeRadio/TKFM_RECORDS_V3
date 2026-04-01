const API = "https://www.tkfmrecords.com/.netlify/functions";

let chart, candleSeries, volumeSeries;

function initChart(){

  const container = document.getElementById("chart");

  chart = LightweightCharts.createChart(container, {
    layout:{
      background:{ color:"#020617" },
      textColor:"#facc15"
    },
    grid:{
      vertLines:{ color:"#111" },
      horzLines:{ color:"#111" }
    }
  });

  candleSeries = chart.addCandlestickSeries();
  volumeSeries = chart.addHistogramSeries({
    priceFormat:{ type:'volume' },
    priceScaleId:''
  });

}

async function loadCandles(){

  const res = await fetch(API + "/market-stream");
  const trades = await res.json();

  if(!trades || trades.length === 0) return;

  // 🔥 GROUP INTO CANDLES (simple 1-min simulation)
  const candles = {};

  trades.forEach(t => {
    const time = Math.floor(new Date(t.created_at).getTime()/60000)*60;

    if(!candles[time]){
      candles[time] = {
        time,
        open: t.price,
        high: t.price,
        low: t.price,
        close: t.price,
        volume: 0
      };
    }

    candles[time].high = Math.max(candles[time].high, t.price);
    candles[time].low = Math.min(candles[time].low, t.price);
    candles[time].close = t.price;
    candles[time].volume += t.shares;
  });

  const candleData = Object.values(candles).sort((a,b)=>a.time-b.time);

  candleSeries.setData(candleData);

  volumeSeries.setData(
    candleData.map(c => ({
      time: c.time,
      value: c.volume
    }))
  );
}

// 🔥 LIVE UPDATE
setInterval(loadCandles, 3000);

window.addEventListener("DOMContentLoaded", ()=>{
  initChart();
  loadCandles();
});
