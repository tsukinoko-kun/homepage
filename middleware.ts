import { NextRequest, NextResponse, userAgent } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const ua = userAgent(req);

  if (ua.browser.name === "ie" && !req.nextUrl.pathname.includes("outdated")) {
    const url = new URL(
      "/outdated/" + ua.browser.name ?? "N/A",
      req.nextUrl.origin
    );
    return NextResponse.redirect(url);
  } else if (req.nextUrl.locale === "default") {
    return NextResponse.redirect(
      new URL(`/en${req.nextUrl.pathname}`, req.url)
    );
  }
}
