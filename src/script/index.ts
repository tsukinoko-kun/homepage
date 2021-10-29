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

const onMouseMove = (ev: MouseEvent) => {
  document.body.style.setProperty("--x", `${ev.pageX}px`);
  document.body.style.setProperty("--y", `${ev.pageY}px`);
};

document.body.addEventListener("mousemove", onMouseMove);
document.body.addEventListener("touchstart", () => {
  document.body.removeEventListener("mousemove", onMouseMove);

  document.body.style.setProperty("--x", "-200vw");
  document.body.style.setProperty("--y", "-200vh");
});
document.body.addEventListener("touchend", () => {
  document.body.addEventListener("mousemove", onMouseMove);
});
