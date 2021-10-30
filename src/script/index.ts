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

{
  const elo: AddEventListenerOptions = {
    capture: false,
    once: false,
    passive: true,
  };

  const mousePos = [0, 0];

  const setTorchPos = (pos: { clientX: number; clientY: number }) => {
    mousePos[0] = Math.round(pos.clientX);
    mousePos[1] = Math.round(pos.clientY);
    updateTorchStyle();
  };

  const updateTorchStyle = () => {
    document.body.style.setProperty("--x", `${mousePos[0]}px`);
    document.body.style.setProperty(
      "--y",
      `${window.pageYOffset + mousePos[1]}px`
    );
  };

  const onTouch = (ev: TouchEvent) => {
    setTorchPos(ev.touches[0]);
  };

  document.body.addEventListener("mousemove", setTorchPos, elo);
  document.addEventListener("scroll", updateTorchStyle, elo);

  document.body.addEventListener("touchmove", onTouch, elo);
  document.body.addEventListener("touchstart", onTouch, elo);
  document.body.addEventListener(
    "touchend",
    () => {
      setTorchPos({
        clientX: -window.innerWidth,
        clientY: -window.innerHeight,
      });
    },
    elo
  );
}
