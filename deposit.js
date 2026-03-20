async function deposit(){

  const amount = prompt("Enter deposit amount")

  const res = await fetch(API + "/stripe-deposit-engine", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ amount: parseFloat(amount) })
  })

  const data = await res.json()

  window.location.href = data.url
}
