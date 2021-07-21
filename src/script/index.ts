import { DomFrame } from "@frank-mayer/photon";
import MyRouter from "./MyRouter";

new MyRouter({
  frame: new DomFrame("#root"),
  sitemap: new Set(["portfolio", "info", "links"]),
  fallbackSite: "404",
  homeSite: "portfolio",
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.ts").then((registration) => {
    console.debug(registration);
  });
}
