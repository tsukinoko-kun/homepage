import { page } from "photon-re";

class Router {
  private readonly pages = [
    "home",
    "info",
    "portfolio",
    "links",
    "contact",
    "404",
  ];

  private updatePageClass(newPageName: string) {
    for (const page of this.pages) {
      if (page !== newPageName) {
        document.body.classList.remove(page);
      } else {
        document.body.classList.add(page);
      }
    }
  }

  @page("/*/home")
  home() {
    this.updatePageClass("home");
    document.title = "{{title}}";
  }

  @page("/*/info")
  info() {
    this.updatePageClass("info");
    document.title = "{{title}} – Info";
  }

  @page("/*/portfolio")
  portfolio() {
    this.updatePageClass("portfolio");
    document.title = "{{title}} – Portfolio";
  }

  @page("/*/links")
  links() {
    this.updatePageClass("links");
    document.title = "{{title}} – Links";
  }

  @page("/*/contact")
  contact() {
    this.updatePageClass("contact");
    document.title = "{{title}} – Contact";
  }
}
