import { client, getParentChain } from "@frank-mayer/magic";
import { makePath } from "photon-re";
import type { path, RoutedEvent } from "photon-re";
import { routerEl } from "./router";

if (client.isTouchDevice) {
  const translateEl = document.getElementById("translate");
  if (translateEl) {
    translateEl.addEventListener(
      "click",
      () => {
        translateEl.classList.toggle("open");
      },
      {
        passive: true,
        capture: true,
      }
    );

    const onTouch = (ev: TouchEvent) => {
      if ((ev.target as Element).id === "translate") {
        return;
      }

      for (const el of getParentChain(ev.target as Node)) {
        if ((el as Element).id === "translate") {
          return;
        }
      }

      translateEl.classList.remove("open");
    };

    const touchEvOptions: AddEventListenerOptions = {
      passive: true,
      capture: false,
    };

    document.addEventListener("touchend", onTouch, touchEvOptions);
    document.addEventListener("touchmove", onTouch, touchEvOptions);
  }
}

const setLangMap: ReadonlyMap<string, HTMLAnchorElement> = Object.freeze(
  new Map([
    ["en", document.getElementById("set-lang-en") as HTMLAnchorElement],
    ["de", document.getElementById("set-lang-de") as HTMLAnchorElement],
    ["jp", document.getElementById("set-lang-jp") as HTMLAnchorElement],
  ])
);

const setLangAnchorHref = (path: path, lang: string, el: HTMLAnchorElement) => {
  path[0] = lang;
  const href = makePath(path);
  el.href = href;
  el.dataset.route = href;
};

const applyLanguage = (path: path, lang?: string) => {
  lang ??= path[0];
  for (const [k, v] of setLangMap) {
    if (k === lang) {
      if (!v.classList.contains("active")) {
        v.classList.add("active");
      }
    } else {
      if (v.classList.contains("active")) {
        v.classList.remove("active");
      }
    }
    setLangAnchorHref(path, k, v);
  }
};

applyLanguage(makePath(routerEl.dataset.route ?? location.pathname));

routerEl.addEventListener(
  "routed",
  (ev) => {
    applyLanguage((ev as RoutedEvent).detail.route);
  },
  {
    passive: true,
  }
);
