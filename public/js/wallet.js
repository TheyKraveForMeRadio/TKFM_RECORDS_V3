async function connectWallet(){

  if(!window.ethereum){
    alert("MetaMask not installed")
    return
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    })

    const wallet = accounts[0]

    console.log("Connected:", wallet)

    localStorage.setItem("wallet", wallet)

    return wallet

  } catch(err){
    console.log("Wallet error:", err.message)
  }
}
