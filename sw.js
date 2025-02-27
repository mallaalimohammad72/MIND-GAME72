self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("game-cache").then((cache) => {
            return cache.addAll([
                "index.html",
                "style.css",
                "script.js",
                "manifest.json",
                "sounds/cat.wav",
                "sounds/dog.mp3",
                "sounds/monkey.wav",
                "sounds/frog.mp3",
                "sounds/pizza.mp3",
                "sounds/rocket.mp3",
                "images/logo.png"
            ]).catch(error => console.log("Cache Error:", error));
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                return new Response("Offline: Resource Not Found", { status: 404 });
            });
        })
    );
});
