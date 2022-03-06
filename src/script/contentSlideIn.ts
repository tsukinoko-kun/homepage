import { client } from "@frank-mayer/magic";

const fadedIn = new Set<Element>();

const observerFunction = (entries: Array<IntersectionObserverEntry>) => {
  for (const entry of entries) {
    const targetEl = entry.target;
    const fadingOut = !entry.isIntersecting && !fadedIn.has(targetEl);

    if (fadingOut && !targetEl.classList.contains("faded-out")) {
      targetEl.classList.add("faded-out");
    } else {
      targetEl.classList.remove("faded-out");
      fadedIn.add(targetEl);
    }
  }
};

const observer = new IntersectionObserver(observerFunction);

export const addSlideInObserver = (el: Element) => {
  if (!client.prefersReducedMotion) {
    observer.observe(el);
  }
};

export const cancelSlideInObserver = () => {
  observer.disconnect();
  fadedIn.clear();
};
