import { setPageNameAsBodyClass } from "./setPageNameAsBodyClass";
import type { RoutedEvent } from "photon-re";

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
