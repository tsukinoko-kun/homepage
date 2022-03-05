import { Client } from "@frank-mayer/magic/bin";

const observerFunction = (entries: Array<IntersectionObserverEntry>) => {
  for (const entry of entries) {
    entry.target.animate(
      [
        {
          opacity: 0,
          transform: "translateX(2rem)",
        },
        {
          opacity: 0,
          transform: "translateX(2rem)",
        },
        {},
      ],
      {
        easing: "ease-out",
        duration: 500,
      }
    );
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
