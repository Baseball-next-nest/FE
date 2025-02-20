import { BASE_URL } from "@/app/api/api";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { cookies } from "next/headers";
import cookie from "cookie";
interface UserInfo {
  nickname?: string;
  email: string;
  password: string;
}
interface ResponseValue {
  user: {
    email: string; // 사용자 이메일
    nickname: string; // 사용자 표시 이름
    profileImg?: string | null; // 사용자 프로필 이미지(URL)
  };

  accessToken: string; // 사용자 접근 토큰
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const userInfo = credentials as unknown as UserInfo;
        // 회원가입
        console.log("userInfo!! " + JSON.stringify(userInfo));
        if (userInfo.nickname) {
          return _signIn("signup", userInfo);
        }
        // 로그인
        return _signIn("login", userInfo);
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent", // 사용자에게 항상 동의 화면을 표시하도록 강제!
        },
      },
    }),
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
    // maxAge: 20,
  },
  pages: {
    signIn: "/signin", // Default: '/auth/signin'
  },
  callbacks: {
    signIn: async ({ account, profile, user }) => {
      if (account?.provider === "google") {
        try {
          // console.log("account " + JSON.stringify(account));
          // console.log("profile " + JSON.stringify(profile));
          // console.log("user " + JSON.stringify(user));
          // 사용자 확인
          const type = (await _existUser(user.email as string))
            ? "oauth/login"
            : "oauth/signup";
          // 회원가입 또는 로그인
          const _user = await _signIn(type, {
            nickname: user.name as string,
            email: user.email as string,
          });
          // console.log("oauth res!! " + JSON.stringify(_user));
          Object.assign(user, _user); // jwt 콜백의 user 속성과 병합
          // console.log(user);
        } catch (error) {
          if (error instanceof Error) {
            return `/error?message=${encodeURIComponent(error.message)}`;
          }
        }
        console.log(profile?.email_verified);
        return !!profile?.email_verified;
      }
      return true;
    },
    jwt: async ({ token, user, trigger, session, account }) => {
      // console.log("@@@@@@@@@@@@@@@jwt@@@@@@@@@@@@@");
      // console.log("jwt user!! " + JSON.stringify(user));
      // console.log("jwt token!! " + JSON.stringify(token));
      // console.log("jwt trigger!! " + JSON.stringify(trigger));
      // console.log("jwt session!! " + JSON.stringify(session));
      // console.log("jwt account!! " + JSON.stringify(account));
      // if ((user && user.signup === "ok") || token.picture) {
      if (user && user.signup === "ok") {
        return null;
      }
      if (user) {
        Object.assign(token, user);
      }
      return token;
    },
    session: async ({ session, token }) => {
      // console.log("@@@@@@@@@@@@@@@session@@@@@@@@@@@@@");
      // console.log("session token!! " + JSON.stringify(token));
      // console.log("session session!! " + JSON.stringify(session));
      session.user.nickname = token.nickname;
      session.user.sid = token.sid;
      session.user.id = token.id;
      // Object.assign(session, token.signup);
      return session;
    },
    // redirect: async ({ url, baseUrl }) => {
    //   console.log("redirect url!!" + url);
    //   console.log("redirect baseUrl!!" + baseUrl);
    //   if (url === baseUrl) {
    //     console.log("Already at baseUrl, no redirection.");
    //     return url;
    //   }
    //   console.log(url.startsWith(baseUrl));
    //   // 기본 동작 유지
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },
});
// 사용자 확인
export async function _existUser(email: string) {
  const body = { email: email };
  console.log(body);
  const res = await fetch(`${BASE_URL}/auth/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data.exist);
  return data.exist;
  // return res.ok;
}

async function makeRequest(url: string, body: object) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = (await res.json()) as ResponseValue | string;
  if (data.sid) {
    let setCookie = data.sid;
    if (setCookie) {
      console.log(setCookie);
      cookies().set("connect.sid", setCookie);
    }
  }
  console.log(JSON.stringify(data));
  if (res.ok && typeof data !== "string") {
    return data;
  }
  throw new Error(
    (data as string) || "문제가 발생했습니다, 잠시 후 다시 시도하세요."
  );
}

async function _signIn(
  type: "signup" | "login" | "oauth/signup" | "oauth/login",
  body: { nickname?: string; email: string; password: string; type?: string }
) {
  let url = `${BASE_URL}/auth/${type}`;
  let requestBody = body;
  if (type === "login") {
    url = `${BASE_URL}/auth/signin`;
    const { email, password } = body;
    requestBody = { email, password };
  }
  if (type === "oauth/login") {
    url = `${BASE_URL}/auth/signin`;
    requestBody = { ...body, type: "social" };
  }
  if (type === "oauth/signup") {
    url = `${BASE_URL}/auth/signup/social`;
    requestBody = { ...body, type: "google" };
  }
  console.log(url);
  console.log(`${type} request to ${url} with body:`, requestBody);
  return await makeRequest(url, requestBody);
}
