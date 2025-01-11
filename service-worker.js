// const CACHE_NAME = "bunkialo-cache-v1";
// const urlsToCache = [
//   "/",
//   "index.html",
//   "src/main.jsx",
//   "public/icons/bunkialo logo.svg",
//   // Add other assets you want to cache
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
//   );
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(self.clients.claim());
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request, { ignoreSearch: true }).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
