import { capitalize } from "@frank-mayer/magic";
import { DomFrame, Components, MultiLanguageRouter } from "@frank-mayer/photon";
import { clickable } from "./cursor";

Components.resolveComponents();

const router = new MultiLanguageRouter({
  languages: new Set(["de", "en"]),
  defaultLanguage: navigator.language.includes("de") ? "de" : "en",
  frame: new DomFrame({ element: document.getElementById("root")! }),
  sitemap: new Set(["home", "portfolio", "info", "links"]),
  fallbackSite: "404",
  homeSite: "home",
  homeAsEmpty: true,
  setWindowTitle: (newPage) =>
    newPage === "home" ? "Frank Mayer" : "Frank Mayer – " + capitalize(newPage),
});

const translateEl = document.getElementById("translate") as HTMLElement;
for (const a of Array.from(translateEl.getElementsByTagName("a"))) {
  a.addEventListener(
    "click",
    (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      router.setLang(a.dataset.lang!, ev);
      translateEl.blur();
    },
    {
      passive: false,
    }
  );
}

router.addEventListener(
  "injected",
  (ev) => {
    const mailEl = document.getElementById("mail") as HTMLAnchorElement;
    if (mailEl) {
      const mail = atob("bWFpbEBmcmFuay1tYXllci5pbw==");
      mailEl.href = `mailto:${mail}`;
      mailEl.innerText = mail;
    }

    window.scrollTo(0, 0);

    for (const button of Array.from(
      document.getElementsByClassName("button")
    )) {
      clickable(button as HTMLElement);
    }

    for (const button of Array.from(document.getElementsByTagName("a"))) {
      clickable(button as HTMLElement);
    }

    for (const a of Array.from(translateEl.getElementsByTagName("a"))) {
      a.href = `/${a.hreflang.split("-")[0]}/${ev.value}`;
      if (router.getLang() === a.dataset.lang) {
        a.classList.add("active");
      } else {
        a.classList.remove("active");
      }
    }
  },
  { passive: true }
);

router.addEventListener(
  "injected",
  () => {
    document.getElementById("splash")?.remove();
  },
  { passive: true, once: true }
);
