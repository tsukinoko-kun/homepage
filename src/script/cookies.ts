// #region CookieStore

declare type cookieOptions = {
  domain?: string;
  expires?: number;
  name: string;
  path: string;
  sameSite: "lax" | "strict" | "none";
  secure: boolean;
  value: string;
};

declare interface CookieStore {
  onchange(event: Event): void;

  /**
   * Gets a single cookie with the matching name.
   */
  get(name: string): Promise<cookieOptions>;

  /**
   * Gets all cookies with a matching name.
   */
  getAll(name: string): Promise<{ [key: string]: cookieOptions }>;

  /**
   * Gets all cookies with a matching options.
   */
  getAll(options: cookieOptions): Promise<{ [key: string]: cookieOptions }>;

  /**
   * Sets a cookie with the given name and value.
   */
  set(name: string, value: string): Promise<void>;

  /**
   * Sets a cookie with the given options.
   */
  set(options: cookieOptions): Promise<void>;

  /**
   * Deletes a cookie with a matching name.
   */
  delete(name: string): Promise<void>;

  /**
   * Deletes a cookie with a matching options.
   */
  delete(options: cookieOptions): Promise<void>;
}

declare const cookieStore: CookieStore | undefined;

// #endregion CookieStore

const cookieBannerEl = document.getElementById("cookies-banner");
const cookiesBannerCloseButtonEl = document.getElementById(
  "cookies-banner__close-button"
);
if (cookieBannerEl && cookiesBannerCloseButtonEl) {
  const close = () => {
    if (cookieStore) {
      cookieStore
        .set({
          domain: document.domain,
          expires: Date.now() + 1000 * 60 * 60 * 24 * 365,
          name: "cookie-banner-closed",
          path: "/",
          sameSite: "lax",
          secure: false,
          value: "true",
        })
        .catch(console.error)
        .finally(() => {
          cookieBannerEl.remove();
        });
    } else {
      cookieBannerEl.remove();
    }
  };

  if (cookieStore) {
    cookieStore
      .get("cookie-banner-closed")
      .then((cookie) => {
        if (cookie.value === "true") {
          cookieBannerEl.remove();
        } else {
          cookiesBannerCloseButtonEl.addEventListener("click", close);
          cookieBannerEl.classList.remove("hidden");
        }
      })
      .catch(() => {
        cookiesBannerCloseButtonEl.addEventListener("click", close);
        cookieBannerEl.classList.remove("hidden");
      });
  } else {
    cookieBannerEl.classList.remove("hidden");
  }
}
