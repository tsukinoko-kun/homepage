import { makePath } from "photon-re";
import type { path } from "photon-re";

const pages = ["home", "info", "portfolio", "links", "contact", "404"];

export const setPageNameAsBodyClass = (path: path) => {
  const pageName = path[1];
  if (pageName) {
    const removeClasses = pages.slice(0);
    removeClasses.splice(removeClasses.indexOf(pageName), 1);
    document.body.classList.remove(...removeClasses);
    document.body.classList.add(pageName);
  }
};

const path = makePath(location.pathname);
setPageNameAsBodyClass(path);
