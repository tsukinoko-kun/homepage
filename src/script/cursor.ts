const clickableElements = new Set<HTMLElement>();

const evOptions: AddEventListenerOptions = { passive: true };

let isClickable = false;

document.addEventListener(
  "mousemove",
  (ev) => {
    document.body.style.setProperty("--x", `${ev.clientX}px`);
    document.body.style.setProperty("--y", `${ev.clientY}px`);
    document.body.style.setProperty("--scale", isClickable ? "1.5" : "1");
  },
  evOptions
);

export const clickable = (el: HTMLElement) => {
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
