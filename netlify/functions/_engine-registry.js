module.exports = {

  // 🔐 AUTH / CORE
  "auth-engine": "auth-engine.cjs",
  "link-wallet-engine": "link-wallet-engine.cjs",

  // 💰 WALLET / PAYMENTS
  "wallet-engine": "wallet-engine.cjs",
  "stripe-deposit-engine": "stripe-deposit-engine.cjs",
  "stripe-payout-engine": "stripe-payout-engine.cjs",
  "stripe-webhook-ledger": "stripe-webhook-ledger.cjs",

  // 🎵 NFT / MUSIC
  "mint-song-nft": "mint-song-nft.cjs",
  "fractionalize-nft-engine": "fractionalize-nft-engine.cjs",

  // 📊 MARKET CORE
  "place-order-engine": "place-order-engine.cjs",
  "orderbook-engine": "orderbook-engine.cjs",
  "market-loop-engine": "market-loop-engine.cjs",

  // ✅ ADD THIS (CRITICAL)
  "get-orderbook-engine": "get-orderbook-engine.cjs",
  "get-trades": "get-trades.cjs",

  // 📈 TRADING SYSTEM
  "trade-queue-engine": "trade-queue-engine.cjs",
  "matching-engine": "matching-engine.cjs",
  "trade-settlement-engine": "trade-settlement-engine.cjs",
  "trade-feed-engine": "trade-feed-engine.cjs",

  // 💸 SHARES
  "buy-shares-engine": "buy-shares-engine.cjs",
  "sell-shares-engine": "sell-shares-engine.cjs",

  // 📊 DATA
  "price-oracle-engine": "price-oracle-engine.cjs",
  "portfolio-engine": "portfolio-engine.cjs",
  "user-pnl-engine": "user-pnl-engine.cjs",

  // 💰 REVENUE
  "streaming-revenue-engine": "streaming-revenue-engine.cjs",
  "profit-distribution-engine": "profit-distribution-engine.cjs"

};
