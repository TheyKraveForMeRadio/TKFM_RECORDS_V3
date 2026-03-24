// 🤖 SIMPLE AI TRADER

export async function runAITrader(){

  const res = await fetch("/.netlify/functions/engine/get-trades?catalog_id=demo");
  const data = await res.json();

  const trades = data.trades || [];

  if(trades.length < 2) return;

  const last = trades[0].price;
  const prev = trades[1].price;

  let action = "HOLD";

  if(last > prev){
    action = "BUY";
  }else if(last < prev){
    action = "SELL";
  }

  return {
    action,
    last,
    prev
  };
}

// 🎤 AI VOICE OUTPUT
export function speakAI(result){

  if(!result) return;

  const msg = new SpeechSynthesisUtterance(
    "Market signal: " + result.action
  );

  speechSynthesis.speak(msg);

}
