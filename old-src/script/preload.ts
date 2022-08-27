import { client } from "@frank-mayer/magic";
import { logger } from "photon-re";

// request prerendered pages to store them in sw cache
if (!client.saveData && navigator.onLine) {
  window.setTimeout(() => {
    const routerEl = document.querySelector("main#root") as HTMLElement | null;
    if (routerEl && routerEl.dataset.preload) {
      const preload = JSON.parse(routerEl.dataset.preload);

      if (Array.isArray(preload)) {
        for (const url of preload as Array<string>) {
          logger.debug(`preloading "${url}" for offline use`);
          fetch(url);
        }
      }
    }
  }, 1000 + Math.random() * 1000);
}
