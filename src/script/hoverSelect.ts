import { retriggerableDelay } from "@frank-mayer/photon";

let id: undefined | number;

export function setHoverSelect() {
  for (const li of Array.from(
    <HTMLCollectionOf<HTMLLIElement>>(
      document.getElementsByClassName("hoverSelect")
    )
  )) {
    li.classList.remove("hoverSelect");
    for (const el of li.children) {
      el.addEventListener("mousemove", () => {
        if (id) {
          clearTimeout(id);
        }

        el.parentElement!.classList.add("hover");

        let sibl = el.parentElement!;
        while ((sibl = <HTMLElement>sibl.nextElementSibling)) {
          sibl.classList.remove("hover");
        }

        sibl = el.parentElement!;
        while ((sibl = <HTMLElement>sibl.previousElementSibling)) {
          sibl.classList.remove("hover");
        }
      });

      (<HTMLElement>el).addEventListener("mouseleave", (ev) => {
        retriggerableDelay(() => {
          el.parentElement!.classList.remove("hover");
          id = undefined;
        }, 1500).then((val) => (id = val));
      });
    }
  }
}
