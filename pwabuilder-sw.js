importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js")

const CACHE = "pwabuilder-page"
const offlineFallbackPage = "/offline.html"
const icon = "/favicon.ico"
const manifest = "/manifest.json"

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll([offlineFallbackPage, icon, manifest])
    }),
  )
})

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE) {
            return caches.delete(cacheName) // 이전 캐시 삭제
          }
        }),
      )
    }),
  )
})

if (self.workbox.navigationPreload.isSupported()) {
  self.workbox.navigationPreload.enable()
}

self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse

          if (preloadResp) {
            return preloadResp
          }

          const networkResp = await fetch(event.request)
          return networkResp
        } catch (error) {
          const cache = await caches.open(CACHE)
          const cachedResp = await cache.match(offlineFallbackPage)
          return cachedResp
        }
      })(),
    )
  } else {
    event.respondWith(
      caches
        .match(event.request)
        .then(cachedResponse => {
          return (
            cachedResponse ||
            fetch(event.request).then(networkResponse => {
              return caches.open(CACHE).then(cache => {
                cache.put(event.request, networkResponse.clone())
                return networkResponse
              })
            })
          )
        })
        .catch(() => {
          if (event.request.url.endsWith(".ico")) {
            return caches.match(icon)
          }
        }),
    )
  }
})
