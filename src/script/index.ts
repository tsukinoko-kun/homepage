import { addRoutingEventListener, makePath } from "../../../photon-re/index.js";

const setLangEn = document.getElementById("set-lang-en") as HTMLAnchorElement;
const setLangDe = document.getElementById("set-lang-de") as HTMLAnchorElement;

const path = makePath(location.pathname);
if (setLangEn) {
  path[0] = "en";
  const href = makePath(path);
  setLangEn.href = href;
  setLangEn.dataset.route = href;
}

if (setLangDe) {
  path[0] = "de";
  const href = makePath(path);
  setLangDe.href = href;
  setLangDe.dataset.route = href;
}

addRoutingEventListener(
  "routed",
  (ev) => {
    if (setLangEn) {
      ev.detail.route[0] = "en";
      const href = makePath(ev.detail.route);
      setLangDe.href = href;
      setLangDe.dataset.route = href;
    }

    if (setLangDe) {
      ev.detail.route[0] = "de";
      const href = makePath(ev.detail.route);
      setLangDe.href = href;
      setLangDe.dataset.route = href;
    }

    const mailEl = document.getElementById("mail") as HTMLAnchorElement;
    if (mailEl) {
      const mail = atob("bWFpbEBmcmFuay1tYXllci5pbw==");
      mailEl.href = "mailto:" + mail;
      mailEl.innerText = mail;
    }
  },
  {
    passive: true,
  }
);
