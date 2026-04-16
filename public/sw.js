self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('tkfm').then(cache => {
      return cache.addAll(['/app.html']);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
