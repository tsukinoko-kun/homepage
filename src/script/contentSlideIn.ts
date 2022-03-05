import { Client } from "@frank-mayer/magic/bin";

const observerFunction = (entries: Array<IntersectionObserverEntry>) => {
  for (const entry of entries) {
    entry.target.classList.toggle("faded-out", !entry.isIntersecting);
  }
};

const observer = new IntersectionObserver(observerFunction);

export const addSlideInObserver = (el: Element) => {
  if (!Client.prefersReducedMotion) {
    observer.observe(el);
  }
};

export const cancelSlideInObserver = () => {
  if (!Client.prefersReducedMotion) {
    observer.disconnect();
  }
};
