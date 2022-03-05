import { Client, getParentChain } from "@frank-mayer/magic";
import type { path, RoutedEvent } from "photon-re";
import { routerEl } from "./router";

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

const makePath: {
  (path: string): path;
  (path: path): string;
} = (path: any): any => {
  if (typeof path === "string") {
    return path.split("/").filter(Boolean);
  } else if (Array.isArray(path)) {
    return "/" + path.join("/");
  } else {
    throw new Error(`Invalid path: ${JSON.stringify(path)}`);
  }
};

const setPageNameAsBodyClass = (path: path) => {
  const pageName = path[1];
  if (pageName) {
    document.body.classList.remove("home");
    document.body.classList.remove("info");
    document.body.classList.remove("portfolio");
    document.body.classList.remove("links");
    document.body.classList.remove("404");
    document.body.classList.add(pageName);
  }
};

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

  setPageNameAsBodyClass(path);

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

const insertEMail = () => {
  const mailEl = document.getElementById("mail") as HTMLAnchorElement;
  if (mailEl) {
    const mail = atob("bWFpbEBmcmFuay1tYXllci5pbw==");
    mailEl.href = "mailto:" + mail;
    mailEl.innerText = mail;
  }
};
insertEMail();

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

    insertEMail();
  },
  {
    passive: true,
  }
);
