import { DomFrame, Router } from "@frank-mayer/photon";
import { capitalize } from "@frank-mayer/magic";

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

export default class MyRouter extends Router {
  protected lang!: string;
  protected readonly canonicalLinkEl = <HTMLLinkElement>(
    document.querySelector("link[rel=canonical]")
  );
  protected hash: string | null;

  constructor(
    param: {
      frame: DomFrame;
      sitemap: Set<string>;
      homeSite?: string;
      homeAsEmpty?: boolean;
      fallbackSite?: string;
      siteNameClassPushElement?: HTMLElement;
    },
    hash: string
  ) {
    super({ ...param, setWindowTitle: (newPage) => capitalize(newPage) });
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

  protected getLang(): string {
    if (!this.lang) {
      const path = location.pathname.split("/").filter((val) => {
        return !!val;
      });
      const firstPathEl = path.length > 0 ? path[0].toLowerCase() : "";
      if (firstPathEl == "de" || firstPathEl == "en") {
        this.lang = firstPathEl;
      } else {
        const lcc = navigator.language.toLowerCase();
        if (lcc.includes("de")) {
          this.lang = this.updateDocLang("de");
        } else {
          this.lang = this.updateDocLang("en");
        }
      }
    }

    return this.lang;
  }

  protected getCurrentSubPageName(): string {
    const path = location.pathname.split("/").filter((val) => {
      return !!val;
    });

    this.getLang();

    return path[path.length - 1] || this.homeSite;
  }

  protected updateDocLang(lang: string): string {
    document.head.parentElement!.lang = lang;
    this.lang = lang;
    return lang;
  }

  protected getLanguageCode() {
    const lcc = this.getLang() ?? navigator.language.toLowerCase();
    if (lcc.includes("de")) {
      return this.updateDocLang("de");
    } else {
      return this.updateDocLang("en");
    }
  }

  protected pageTitleToHref(newPage: string): string {
    return `/${this.getLanguageCode()}/${newPage}`;
  }

  protected pageTitleToStoreLocation(newPage: string): string {
    return `content/${this.getLanguageCode()}/${newPage}.html`;
  }
}
