import { Client } from "@frank-mayer/magic";
export let clickable = (el: HTMLElement) => {};

document.body.style.setProperty("--x", `${innerWidth / 2}px`);
document.body.style.setProperty("--y", `${innerHeight / 2}px`);

if (!Client.mobile) {
  document.body.classList.add("cursor-enabled");
  const clickableElements = new Set<HTMLElement>();

  const evOptions: AddEventListenerOptions = { passive: true };

  let isClickable = false;

  document.addEventListener(
    "mousemove",
    (ev) => {
      document.body.style.setProperty("--x", `${ev.clientX}px`);
      document.body.style.setProperty("--y", `${ev.clientY}px`);
      if (isClickable) {
        document.body.classList.add("cursor-active");
      } else {
        document.body.classList.remove("cursor-active");
      }
    },
    evOptions
  );

  clickable = (el: HTMLElement) => {
    if (clickableElements.has(el)) {
      return;
    }

    clickableElements.add(el);

    el.addEventListener(
      "mousemove",
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
