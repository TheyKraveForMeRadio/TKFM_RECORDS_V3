
const TRUSTED_ADDRESSES = [
  // 🔒 YOUR CONTRACTS ONLY
  "0xYourContractHere",
  "0xYourTreasuryWallet"
]

function isTrusted(address){
  return TRUSTED_ADDRESSES.includes(address.toLowerCase())
}

function showWarning(tx){
  return confirm(
`⚠️ WARNING: You are about to SEND funds

Amount: ${tx.value || "UNKNOWN"}
To: ${tx.to}

If you did NOT intend this → CANCEL NOW`
  )
}

async function safeSend(tx){

  // 🚨 BLOCK UNKNOWN DESTINATIONS
  if(!isTrusted(tx.to)){
    const proceed = showWarning(tx)
    if(!proceed){
      throw new Error("User blocked unsafe transaction")
    }
  }

  // 🚨 EXTRA CHECK
  if(tx.value && parseFloat(tx.value) > 0){
    const confirmSend = confirm(
`💸 CONFIRM SEND

You are sending REAL MONEY

Amount: ${tx.value}
To: ${tx.to}

Continue?`
    )

    if(!confirmSend){
      throw new Error("User cancelled send")
    }
  }

  // ✅ SEND VIA METAMASK
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [tx]
  })
}


// 🚫 BLOCK KNOWN BAD ADDRESSES
const BLACKLIST = [
  "0xeeeeee90971b6264c53175d3af6840a8dd5dc7b6c"
]

function isBlacklisted(address){
  return BLACKLIST.includes(address.toLowerCase())
}

// 🔒 EXTEND CHECK
async function safeSend(tx){

  if(isBlacklisted(tx.to)){
    alert("🚫 BLOCKED: Known malicious address")
    throw new Error("Blocked malicious address")
  }

  if(!isTrusted(tx.to)){
    const proceed = showWarning(tx)
    if(!proceed){
      throw new Error("User blocked unsafe transaction")
    }
  }

  if(tx.value && parseFloat(tx.value) > 0){
    const confirmSend = confirm(
`💸 CONFIRM SEND

You are sending REAL MONEY

Amount: ${tx.value}
To: ${tx.to}

Continue?`
    )

    if(!confirmSend){
      throw new Error("User cancelled send")
    }
  }

  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [tx]
  })
}

