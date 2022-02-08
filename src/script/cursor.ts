import type { RoutingEvent } from "photon-re";
import {
  addDisposableEventListener,
  Client,
  disposeNode,
} from "../../node_modules/@frank-mayer/magic";

const router = document.getElementById("root")!;

document.body.style.setProperty("--x", `${innerWidth / 2}px`);
document.body.style.setProperty("--y", `${innerHeight / 2}px`);

if (!Client.mobile) {
  document.body.classList.add("cursor-enabled");

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

  const clickable = (el: Element) => {
    if (el.hasAttribute("data-clickable")) {
      return;
    }

    el.toggleAttribute("data-clickable", true);

    addDisposableEventListener(
      el,
      "mousemove",
      () => {
        isClickable = true;
      },
      evOptions
    );

    addDisposableEventListener(
      el,
      "mouseout",
      () => {
        isClickable = false;
      },
      evOptions
    );
  };

  const applyAllClickable = () => {
    Array.from(document.body.getElementsByTagName("a")).forEach(clickable);
    Array.from(document.body.getElementsByClassName("button")).forEach(
      clickable
    );
    Array.from(document.body.getElementsByTagName("button")).forEach(clickable);
  };

  applyAllClickable();

  router.addEventListener("routed", applyAllClickable, {
    passive: true,
  });

  router.addEventListener(
    "route",
    (ev) => {
      disposeNode((ev as RoutingEvent).detail.router, false);
    },
    {
      passive: true,
      capture: true,
    }
  );
}
