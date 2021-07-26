self.addEventListener("install", (ev) => {
  const iev = <InstallEvent>ev;
  iev.waitUntil(
    caches.open("statics").then((cache) => {
      return cache.addAll(["./index.html"]);
    })
  );
});

self.addEventListener("fetch", (ev) => {
  const fev = <FetchEvent>ev;
  fev.respondWith(
    caches.match(fev.request).then((response) => {
      return (
        response ??
        fetch(fev.request, {
          cache: "default",
          redirect: "error",
          referrerPolicy: "no-referrer",
        })
      );
    })
  );
});
