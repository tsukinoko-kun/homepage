import { delay } from "@frank-mayer/photon/dist";

export default async function addAnimation(): Promise<void> {
  await delay(250);

  for await (const el of Array.from(
    document.querySelectorAll(".portfolio>main>ol>li>div")
  ) as Array<HTMLElement>) {
    el.style.transitionProperty = "all";
    el.style.transitionDuration = "300ms";
    el.style.transitionDelay = "0";
    el.style.transitionTimingFunction = "ease-in-out";
    if ("webkitTransitionTimingFunction" in el.style) {
      el.style.webkitTransitionTimingFunction = "ease-in-out";
    }
  }
}
