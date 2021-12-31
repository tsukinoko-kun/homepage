import { capitalize } from "@frank-mayer/magic";
import { DomFrame, Components, MultiLanguageRouter } from "@frank-mayer/photon";

Components.resolveComponents();

const router = new MultiLanguageRouter({
  languages: new Set(["de", "en"]),
  defaultLanguage: navigator.language.includes("de") ? "de" : "en",
  frame: new DomFrame("#root"),
  sitemap: new Set(["home", "portfolio", "info", "links"]),
  fallbackSite: "404",
  homeSite: "home",
  setWindowTitle: (newPage: string) => "Frank Mayer – " + capitalize(newPage),
});

router.addEventListener("injected", () => {
  const mailEl = document.getElementById("mail") as HTMLAnchorElement;
  if (mailEl) {
    const mail = atob("bWFpbEBmcmFuay1tYXllci5pbw==");
    mailEl.href = `mailto:${mail}`;
    mailEl.innerText = mail;
  }

  window.scrollTo(0, 0);
});
