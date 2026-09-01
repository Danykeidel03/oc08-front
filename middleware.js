import { NextResponse } from "next/server";
import { PANEL_SESSION_COOKIE } from "@/lib/panelSession";

export const config = {
  matcher: ["/panel/:path*"],
};

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/panel/login") {
    return NextResponse.next();
  }

  const session = request.cookies.get(PANEL_SESSION_COOKIE)?.value;
  const expected = process.env.PANEL_SESSION_SECRET;

  if (!session || !expected || session !== expected) {
    const loginUrl = new URL("/panel/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
