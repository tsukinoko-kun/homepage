import { capitalize } from "@frank-mayer/magic";
import { DomFrame, Components, MultiLanguageRouter } from "@frank-mayer/photon";

Components.resolveComponents();

new MultiLanguageRouter({
  languages: new Set(["de", "en"]),
  defaultLanguage: navigator.language.includes("de") ? "de" : "en",
  frame: new DomFrame("#root"),
  sitemap: new Set(["portfolio", "info", "links"]),
  fallbackSite: "404",
  homeSite: "portfolio",
  setWindowTitle: (newPage: string) => "Frank Mayer - " + capitalize(newPage),
});
