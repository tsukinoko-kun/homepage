if (
  window.document.documentMode &&
  !window.location.pathname.includes("/outdated/")
) {
  const lang = window.location.pathname.split("/").filter(Boolean)[0];
  if (lang === "en" || lang === "de") {
    window.location.replace(
      `/${lang}/outdated/Internet Explorer ${window.document.documentMode}`
    );
  } else {
    window.location.replace(
      "/outdated/Internet Explorer " + window.document.documentMode
    );
  }
}
