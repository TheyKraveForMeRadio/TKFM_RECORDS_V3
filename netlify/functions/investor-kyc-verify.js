import fetch from "node-fetch";

export async function handler(event) {

  const body = JSON.parse(event.body);

  const { wallet,email } = body;

  const response = await fetch(
    "https://api.kyc-provider.com/verify",
    {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ wallet,email })
    }
  );

  const data = await response.json();

  return {

    statusCode:200,

    body:JSON.stringify({

      verified:data.verified

    })

  };

}
