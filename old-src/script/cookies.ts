import { dotenv } from "photon-re";

import Cookies from "js-cookie";

const cookieBannerEl = document.getElementById("cookies-banner");

if (dotenv.production) {
  const cookiesBannerCloseButtonEl = document.getElementById(
    "cookies-banner__close-button"
  );

  if (cookieBannerEl && cookiesBannerCloseButtonEl) {
    const expr = new Date();
    expr.setFullYear(expr.getFullYear() + 1);
    const close = () => {
      if (Cookies.set) {
        Cookies.set("cookie-banner-closed", "true", {
          domain: document.domain,
          expires: expr,
          path: "/",
          sameSite: "lax",
          secure: false,
          value: "true",
        });
      }

      cookieBannerEl.remove();
    };

    if (Cookies.get) {
      const cookie = Cookies.get("cookie-banner-closed");
      if (cookie) {
        if (cookie === "true") {
          cookieBannerEl.remove();
        } else {
          cookiesBannerCloseButtonEl.addEventListener("click", close);
          cookieBannerEl.classList.remove("hidden");
        }
      } else {
        cookiesBannerCloseButtonEl.addEventListener("click", close);
        cookieBannerEl.classList.remove("hidden");
      }
    } else {
      cookiesBannerCloseButtonEl.addEventListener("click", close);
      cookieBannerEl.classList.remove("hidden");
    }
  }
} else {
  if (cookieBannerEl) {
    cookieBannerEl.remove();
  }
}
