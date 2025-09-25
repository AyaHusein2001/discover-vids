import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./lib/utils";
 
export function middleware(req: NextRequest) {
  const token = req && req.cookies ? req.cookies.get("token")?.value : null;
  const userId = verifyToken(token as string);
  const { pathname } = req.nextUrl;

  if ((token&& userId )|| pathname === "/login") {
    return NextResponse.next();

  }
  else {
    return NextResponse.redirect(new URL("/login", req.url));
  }

}
 
export const config = {
  matcher: "/about/:path*",
};