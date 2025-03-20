import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "path-to-regexp";
import { getSession } from "@/serverActions/auth";
import { cookies } from "next/headers";
const matchersForAuth = ["/myaccount/:path", "/users/:path"];
const matchersForSignIn = ["/signup/:path", "/signin/:path"];
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const cookieHeader = request.headers.get("cookie");
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession())
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/", request.url));
  }
  // 인증 후 회원가입 및 로그인 접근 제어!
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession())
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cache-Control"
  );

  if (cookieHeader) {
    response.headers.set("Cookie", cookieHeader);
  }
  if (response.status === 401) {
    console.log("errr");
  }
  return response;
}

// 경로 일치 확인!
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}
