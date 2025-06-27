// sw.js - Service Worker Minimalis

self.addEventListener('install', (event) => {
  console.log('Service Worker: Menginstall...');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Mengaktifkan...');
});

// Listener fetch sederhana ini sudah cukup untuk memenuhi kriteria PWA
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
