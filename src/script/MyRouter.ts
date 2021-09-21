import {
  MultiLanguageRouter,
  MultiLanguageRouterOptions,
} from "@frank-mayer/photon";

const menuButton = document.getElementById("menu-button");
const main = document.getElementById("root");

if (menuButton) {
  menuButton.addEventListener("mousemove", () => {
    document.body.classList.add("active");
  });
}

if (main) {
  main.addEventListener("mousemove", () => {
    document.body.classList.remove("active");
  });
}

export default class MyRouter extends MultiLanguageRouter {
  protected readonly canonicalLinkEl = <HTMLLinkElement>(
    document.querySelector("link[rel=canonical]")
  );
  protected hash: string | null;

  constructor(options: MultiLanguageRouterOptions, hash: string) {
    super(options);
    this.hash = hash ? hash.substr(1) : null;
  }

  protected onInject(newPage: string) {
    this.canonicalLinkEl.href = `https://frank-mayer.io${location.pathname}`;

    document.body.classList.remove("active");

    switch (newPage) {
      case "links":
        const mailEl = <HTMLAnchorElement | null>(
          document.getElementById("mail")
        );
        if (mailEl) {
          mailEl.href = "mailto:mail@frank-mayer.io";
          mailEl.innerText = "mail@frank-mayer.io";
        }
        break;
    }

    if (this.hash) {
      const el = document.getElementById(this.hash);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }

    this.hash = null;
  }
}
