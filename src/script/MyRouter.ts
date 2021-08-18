import { Router } from "@frank-mayer/photon";
import setHoverSelect from "./Portfolio/hoverSelect";
import addAnimation from "./Portfolio/addAnimation";

export default class MyRouter extends Router {
  protected lang!: string;
  protected readonly canonicalLinkEl = <HTMLLinkElement>(
    document.querySelector("link[rel=canonical]")
  );

  protected onInject(newPage: string) {
    this.canonicalLinkEl.href = `https://frank-mayer.io${location.pathname}`;

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

      case "portfolio":
        setHoverSelect();
        addAnimation();
        break;
    }
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
