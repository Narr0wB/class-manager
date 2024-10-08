import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  const manutenzione = process.env.MANUTENZIONE === "true";

  // Handle maintenance mode
  if (manutenzione && pathname !== "/manutenzione") {
    return NextResponse.redirect(new URL("/manutenzione", req.url));
  }

  if (!manutenzione && pathname === "/manutenzione") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Redirect logged-in users from login page to home
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Redirect unauthenticated users to login page
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/login/:path*", "/manutenzione/:path*"]
};
