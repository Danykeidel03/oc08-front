import { NextResponse } from "next/server";
import { isValidPanelSession, PANEL_SESSION_COOKIE } from "@/lib/panelSession";

export const config = {
  matcher: ["/panel/:path*"],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/panel/login") {
    return NextResponse.next();
  }

  const session = request.cookies.get(PANEL_SESSION_COOKIE)?.value;

  if (!(await isValidPanelSession(session))) {
    const loginUrl = new URL("/panel/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
