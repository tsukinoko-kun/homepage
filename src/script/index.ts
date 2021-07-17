import { DomFrame, Router } from "@frank-mayer/photon";

const router = new Router({
  frame: new DomFrame("#root"),
  sitemap: new Set(["portfolio", "info", "links"]),
  fallbackSite: "404",
  homeSite: "portfolio",
});
