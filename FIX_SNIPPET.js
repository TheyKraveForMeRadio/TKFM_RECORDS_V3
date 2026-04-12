async function deposit(key){
  const res = await fetch("https://tkfmrecords.netlify.app/.netlify/functions/create-checkout-session", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      lookup_key: key,
      user_id: userId
    })
  });

  const data = await res.json();

  if(data.url){
    window.location = data.url;
  } else {
    alert("Stripe error");
    console.log(data);
  }
}
