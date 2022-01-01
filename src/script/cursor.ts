const isMobile = (navigator as any).userAgentData.mobile;

export let clickable = (el: HTMLElement) => {};

if (isMobile) {
  document.body.style.setProperty("--x", "-100%");
  document.body.style.setProperty("--y", "-100%");
  document.body.style.setProperty("--scale", "0");
} else {
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
