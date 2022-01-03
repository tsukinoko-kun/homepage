import { Client } from "@frank-mayer/magic";
export let clickable = (el: HTMLElement) => {};

document.body.style.setProperty("--x", "50%");
document.body.style.setProperty("--y", "50%");
document.body.style.setProperty("--scale", "0");

if (!Client.mobile) {
  const clickableElements = new Set<HTMLElement>();

  const evOptions: AddEventListenerOptions = { passive: true };

  let isClickable = false;

  document.addEventListener(
    "mousemove",
    (ev) => {
      document.body.style.setProperty("--x", `${ev.clientX}px`);
      document.body.style.setProperty("--y", `${ev.clientY}px`);
      document.body.style.setProperty("--scale", isClickable ? "1.75" : "1");
    },
    evOptions
  );

  clickable = (el: HTMLElement) => {
    if (clickableElements.has(el)) {
      return;
    }

    clickableElements.add(el);

    el.addEventListener(
      "mouseenter",
      () => {
        isClickable = true;
      },
      evOptions
    );

    el.addEventListener(
      "mouseout",
      () => {
        isClickable = false;
      },
      evOptions
    );
  };
}
