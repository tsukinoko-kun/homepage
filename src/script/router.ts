import { addSlideInObserver, cancelSlideInObserver } from "./contentSlideIn";

export const routerEl = document.getElementById("root")!;

routerEl.addEventListener("route", () => {
  cancelSlideInObserver();
  routerEl.classList.add("loading");
});

routerEl.addEventListener("routed", () => {
  for (const el of Array.from(routerEl.children)) {
    addSlideInObserver(el);
  }

  setTimeout(() => {
    routerEl.classList.remove("loading");
  }, 200);

  window.scrollTo(0, 0);
});
