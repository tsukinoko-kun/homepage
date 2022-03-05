import { addSlideInObserver, cancelSlideInObserver } from "./contentSlideIn";

export const routerEl = document.getElementById("root")!;

routerEl.addEventListener("routed", () => {
  cancelSlideInObserver();
  for (const el of Array.from(routerEl.children)) {
    addSlideInObserver(el);
  }
});
