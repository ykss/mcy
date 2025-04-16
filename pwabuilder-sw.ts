/// <reference lib="webworker" />

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js")

// 서비스 워커 타입 정의
interface WorkboxNavigationPreload {
  isSupported(): boolean
  enable(): void
}

interface Workbox {
  navigationPreload: WorkboxNavigationPreload
}

interface FetchEvent extends Event {
  request: Request
  respondWith(response: Response | Promise<Response>): void
  preloadResponse: Promise<Response | undefined>
}

interface ServiceWorkerGlobalScope {
  skipWaiting(): Promise<void>
  workbox: Workbox
  addEventListener(type: string, listener: (event: any) => void): void
}

// self 변수 타입 선언
declare const self: ServiceWorkerGlobalScope

export const CACHE = "pwabuilder-page"
export const offlineFallbackPage = "/offline.html"
export const icon = "/favicon.ico"
export const manifest = "/manifest.json"

self.addEventListener("message", (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll([offlineFallbackPage, icon, manifest])
    }),
  )
})

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

if (self.workbox.navigationPreload.isSupported()) {
  self.workbox.navigationPreload.enable()
}

self.addEventListener("fetch", (event: FetchEvent) => {
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
          if (cachedResp) {
            return cachedResp
          }
          // 기본 응답 반환
          return new Response("오프라인 페이지를 찾을 수 없습니다.", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/html; charset=utf-8",
            }),
          })
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
            return caches.match(icon).then(response => {
              if (response) {
                return response
              }
              // 기본 응답 반환
              return new Response("아이콘을 찾을 수 없습니다.", {
                status: 404,
                statusText: "Not Found",
                headers: new Headers({
                  "Content-Type": "text/plain; charset=utf-8",
                }),
              })
            })
          }
          // 기본 응답 반환
          return new Response("리소스를 찾을 수 없습니다.", {
            status: 404,
            statusText: "Not Found",
            headers: new Headers({
              "Content-Type": "text/plain; charset=utf-8",
            }),
          })
        }),
    )
  }
})
