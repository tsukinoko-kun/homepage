import { DomFrame } from "@frank-mayer/photon";
import MyRouter from "./MyRouter";

new MyRouter(
  {
    frame: new DomFrame("#root"),
    sitemap: new Set(["portfolio", "info", "links"]),
    fallbackSite: "404",
    homeSite: "portfolio",
  },
  location.hash
);
