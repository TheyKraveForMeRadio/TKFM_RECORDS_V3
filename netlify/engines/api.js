import * as tradeFeed from "./trade-feed.js"
import * as musicIndex from "./music-index-engine.js"
import * as marketStream from "./tkfm-market-stream-engine.js"

export const handler = async (event, context) => {

  const path = event.path.replace("/.netlify/functions/api/api/", "")

  if(path === "trade-feed") {
    return tradeFeed.handler(event, context)
  }

  if(path === "music-index") {
    return musicIndex.handler(event, context)
  }

  if(path === "market-stream") {
    return marketStream.handler(event, context)
  }

  return {
    statusCode:404,
    body:JSON.stringify({error:"endpoint not found"})
  }

}
