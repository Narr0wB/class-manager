import { isInManutenzione } from '@/lib/backend/manutenzione';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // const session = await getServerSession();
  // const path = request.nextUrl.pathname;

  // console.log("Session:", session);
  // console.log("Path:", path);
  // console.log("Maintenance Mode:", isInManutenzione());

  // if (isInManutenzione()) {
  //   return NextResponse.rewrite(new URL("/manutenzione", request.url));
  // }

  // if (path.startsWith("/manutenzione") && !isInManutenzione()) {
  //   return NextResponse.rewrite(new URL("/home", request.url));
  // }

  // if (path.startsWith("/home") && !session) {
  //   return NextResponse.rewrite(new URL("/login", request.url));
  // }

  // if (path.startsWith("/login") && session) {
  //   return NextResponse.rewrite(new URL("/home", request.url));
  // }

  // return NextResponse.next();  // This is important for other requests

  console.log("Middleware is running");
  return NextResponse.next();
}

export const config = {
  matcher: ['/home*', '/login*', '/manutenzione*'],
};
