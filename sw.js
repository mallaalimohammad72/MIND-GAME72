self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("game-cache").then((cache) => {
            return cache.addAll([
                "index.html",
                "style.css",
                "script.js",
                "manifest.json",
                "cat.wav",
                "dog.mp3",
                "monkey.wav",
                "frog.mp3",
                "pizza.mp3",
                "rocket.mp3",
                "logo.png",
                "logo.png"
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
