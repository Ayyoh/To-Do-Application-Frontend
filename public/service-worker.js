// public/service-worker.js

self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Basic cache-first strategy for GET requests
  if (event.request.method === "GET") {
    event.respondWith(
      caches.open("task-vault-cache").then((cache) => {
        return cache.match(event.request).then((response) => {
          return (
            response ||
            fetch(event.request).then((fetched) => {
              cache.put(event.request, fetched.clone());
              return fetched;
            })
          );
        });
      })
    );
  }
});
