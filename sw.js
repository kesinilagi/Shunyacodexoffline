// sw.js - Service Worker Minimalis

self.addEventListener('install', (event) => {
  console.log('Service Worker: Install');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate');
});

self.addEventListener('fetch', (event) => {
  // Tidak melakukan caching, hanya memenuhi syarat PWA
  event.respondWith(fetch(event.request));
});
