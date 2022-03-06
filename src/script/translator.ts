import { Client, getParentChain } from "@frank-mayer/magic";
import { makePath } from "photon-re";
import type { path, RoutedEvent } from "photon-re";
import { routerEl } from "./router";
import { setPageNameAsBodyClass } from "./setPageNameAsBodyClass";

if (Client.mobile) {
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

const setLangEn = document.getElementById("set-lang-en") as HTMLAnchorElement;
const setLangDe = document.getElementById("set-lang-de") as HTMLAnchorElement;

const setLangAnchorHref = (path: path, lang: string, el: HTMLAnchorElement) => {
  path[0] = lang;
  const href = makePath(path);
  el.href = href;
  el.dataset.route = href;
};

{
  const path = makePath(location.pathname);
  const currentLang = path[0];

  if (setLangEn) {
    if (currentLang === "en") {
      setLangEn.classList.add("active");
    } else {
      setLangEn.classList.remove("active");
    }
    setLangAnchorHref(path, "en", setLangEn);
  }

  if (setLangDe) {
    if (currentLang === "de") {
      setLangDe.classList.add("active");
    } else {
      setLangDe.classList.remove("active");
    }
    setLangAnchorHref(path, "de", setLangDe);
  }
}

routerEl.addEventListener(
  "routed",
  (ev) => {
    setPageNameAsBodyClass((ev as RoutedEvent).detail.route);
    const currentLang = (ev as RoutedEvent).detail.route[0];

    if (setLangEn) {
      if (currentLang === "en") {
        setLangEn.classList.add("active");
      } else {
        setLangEn.classList.remove("active");
      }
      setLangAnchorHref((ev as RoutedEvent).detail.route, "en", setLangEn);
    }

    if (setLangDe) {
      if (currentLang === "de") {
        setLangDe.classList.add("active");
      } else {
        setLangDe.classList.remove("active");
      }
      setLangAnchorHref((ev as RoutedEvent).detail.route, "de", setLangDe);
    }
  },
  {
    passive: true,
  }
);
