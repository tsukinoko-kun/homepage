import { client } from "@frank-mayer/magic";
import { CPage, page } from "photon-re";

if (!client.isTouchDevice) {
  document.body.classList.add("cursor-enabled");
  let evOptions: AddEventListenerOptions = { passive: true };

  document.body.style.setProperty("--x", `${innerWidth / 2}px`);
  document.body.style.setProperty("--y", `${innerHeight / 2}px`);

  document.addEventListener(
    "mousemove",
    (ev) => {
      let isClickable = false;

      const targetChain = [ev.target!];
      while (targetChain.length > 0) {
        const target = targetChain.pop() as Element;
        if (!target) {
          break;
        }

        if (target.hasAttribute("data-clickable")) {
          isClickable = true;
          break;
        }

        if ("children" in target) {
          for (let i = 0; i < target.children.length; i++) {
            targetChain.push(target.children.item(i)!);
          }
        }
      }

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
}

@page("/**")
export class Cursor implements CPage {
  onRouted(): void {
    this.applyAllClickable();
  }
  private applyAllClickable() {
    Array.from(document.body.getElementsByTagName("a")).forEach(this.clickable);
    Array.from(document.body.getElementsByClassName("button")).forEach(
      this.clickable
    );
    Array.from(document.body.getElementsByTagName("button")).forEach(
      this.clickable
    );
    Array.from(
      document.body.querySelectorAll('form input[type="submit"]')
    ).forEach(this.clickable);
  }

  private clickable(el: Element) {
    if (el.hasAttribute("data-clickable")) {
      return;
    }

    el.toggleAttribute("data-clickable", true);
  }
}
