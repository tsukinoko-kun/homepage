import { capitalize } from "@frank-mayer/magic";
import { DomFrame, Components } from "@frank-mayer/photon";
import MyRouter from "./MyRouter";

Components.resolveComponents();

new MyRouter(
  {
    languages: new Set(["de", "en"]),
    defaultLanguage: "en",
    frame: new DomFrame("#root"),
    sitemap: new Set(["portfolio", "info", "links"]),
    fallbackSite: "404",
    homeSite: "portfolio",
    setWindowTitle: (newPage: string) => "Frank Mayer - " + capitalize(newPage),
  },
  location.hash
);
