self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("card13-v1").then((cache) => cache.addAll(["/index.html"]))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
