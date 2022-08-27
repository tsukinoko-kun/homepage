import { page } from "photon-re";

export class Router {
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

    for (const formEl of Array.from(document.getElementsByTagName("form"))) {
      formEl.addEventListener(
        "submit",
        (ev: SubmitEvent) => {
          ev.preventDefault();
          for (const el of formEl.querySelectorAll(
            "input,textarea"
          ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement>) {
            if (
              !el.checkValidity() ||
              (el.minLength > 0 && el.value.length < el.minLength) ||
              (el.maxLength > 0 && el.value.length > el.maxLength)
            ) {
              el.focus();
              return;
            }
          }

          const formData = new FormData(formEl);
          const xhr = new XMLHttpRequest();
          xhr.open("POST", formEl.action);
          xhr.onload = () => {
            if (xhr.status === 200) {
              formEl.reset();
              alert(xhr.responseText);
            } else {
              alert(`Error ${xhr.status}: ${xhr.responseText}`);
            }
          };
          xhr.send(formData);
        },
        {
          passive: false,
          capture: true,
        }
      );
    }
  }
}
