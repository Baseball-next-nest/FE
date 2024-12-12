import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "path-to-regexp";
import { getSession } from "@/serverActions/auth";
const matchersForAuth = ["/myaccount/:path", "/users/:path"];
const matchersForSignIn = ["/signup/:path", "/signin/:path"];
export async function middleware(request: NextRequest) {
  // console.log("middleware " + request.nextUrl.pathname);
  // console.log("middleware session " + (await getSession()));
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession())
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/", request.url));
    // : NextResponse.redirect(new URL(`/signin?callbackUrl=${request.url}`, request.url))
  }
  // 인증 후 회원가입 및 로그인 접근 제어!
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession())
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }
  return NextResponse.next();
}

// 경로 일치 확인!
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}
