const CACHE = "tkfm-cache-v1"

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll([
        "/",
        "/trading-pro.html",
        "/css/tkfm-global.css",
        "/css/mobile.css"
      ])
    })
  )
})

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  )
})
