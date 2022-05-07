import { setPageNameAsBodyClass } from "./setPageNameAsBodyClass";
import type { RoutedEvent } from "photon-re";
import { join } from "@frank-mayer/magic";

export const routerEl = document.getElementById("root")!;

routerEl.addEventListener("route", () => {
  routerEl.classList.add("loading");
});

routerEl.addEventListener("routed", (ev) => {
  setPageNameAsBodyClass((ev as RoutedEvent).detail.route);

  setTimeout(() => {
    routerEl.classList.remove("loading");
  }, 200);

  window.scrollTo(0, 0);
});

setTimeout(() => {
  if (
    routerEl.dataset.route == "/404" ||
    routerEl.dataset.route == "/404.html"
  ) {
    document.getElementById("translate")!.style.display = "none";

    document
      .getElementsByTagName("nav")[0]
      ?.querySelectorAll("a[data-route]")
      .forEach((el) => {
        const a = el as HTMLAnchorElement;
        const newHref = "/" + join("en/en", a.dataset.route!);
        a.dataset.route = a.href = newHref;
      });
  }
}, 1000);

const splashEl = document.getElementById("splash");
if (splashEl) {
  Promise.all(
    (
      Array.from(
        document.querySelectorAll('img:not([loading="lazy"])')
      ) as Array<HTMLImageElement>
    ).map(
      (el) =>
        new Promise<void>((resolve) => {
          if (el.complete && el.naturalHeight !== 0) {
            resolve();
          } else {
            el.addEventListener("load", () => resolve());
          }
        })
    )
  ).then(() => {
    splashEl.remove();
  });

  // Fallback
  setTimeout(() => {
    splashEl.remove();
  }, 5000);
}
