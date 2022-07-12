import { client } from "@frank-mayer/magic";
import { CPage, page } from "photon-re";

let notClickableTimeout: number | undefined;

if (!client.isTouchDevice) {
  document.body.classList.add("cursor-enabled");

  document.body.style.setProperty("--x", `${innerWidth / 2}px`);
  document.body.style.setProperty("--y", `${innerHeight / 2}px`);

  document.addEventListener(
    "mousemove",
    (ev) => {
      document.body.style.setProperty("--x", `${ev.clientX}px`);
      document.body.style.setProperty("--y", `${ev.clientY}px`);

      if (!notClickableTimeout) {
        notClickableTimeout = window.setTimeout(() => {
          document.body.classList.remove("cursor-active");
        }, 250);
      }
    },
    { passive: true, capture: true }
  );
}

@page("/**")
export class Cursor implements CPage {
  onRouted(): void {
    if (!client.isTouchDevice) {
      this.applyAllClickable();
    }
  }

  private applyAllClickable() {
    Array.from<HTMLElement>(
      document.querySelectorAll("a[href], button, input[type=submit]")
    ).forEach(this.clickable);
  }

  private clickable(el: HTMLElement) {
    if (el.hasAttribute("data-clickable")) {
      return;
    }

    el.toggleAttribute("data-clickable", true);
    el.addEventListener(
      "mousemove",
      () => {
        if (notClickableTimeout) {
          clearTimeout(notClickableTimeout);
          notClickableTimeout = undefined;
        }
        document.body.classList.add("cursor-active");
      },
      { passive: true, capture: false }
    );
  }
}
