import { client } from "@frank-mayer/magic/Client";

if (client.isTouchDevice) {
  const translateEl = document.getElementById("translate");

  if (translateEl) {
    translateEl.addEventListener(
      "touchstart",
      () => {
        translateEl.classList.toggle("open", true);
      },
      {
        passive: true,
        capture: false,
      }
    );

    document.addEventListener(
      "touchstart",
      (ev) => {
        const targetEl = ev.target as HTMLElement | null;
        if (targetEl && targetEl.id !== "translate") {
          translateEl.classList.toggle("open", false);
        }
      },
      {
        passive: true,
        capture: true,
      }
    );
  }
}
