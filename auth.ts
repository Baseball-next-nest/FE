import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";

interface UserInfo {
  displayName?: string;
  email: string;
  password: string;
}
interface ResponseValue {
  user: {
    email: string; // 사용자 이메일
    displayName: string; // 사용자 표시 이름
    profileImg: string | null; // 사용자 프로필 이미지(URL)
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
        console.log(userInfo);
        if (userInfo.displayName) {
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
  },
  pages: {
    signIn: "/signin", // Default: '/auth/signin'
  },
  callbacks: {
    signIn: async ({ account, profile, user }) => {
      if (account?.provider === "google") {
        try {
          console.log(account, profile, user);
          // 사용자 확인
          // const type = (await _existUser(user.email as string))
          //   ? "oauth/login"
          //   : "oauth/signup";
          // // 회원가입 또는 로그인
          // const _user = await _signIn(type, {
          //   displayName: user.name as string,
          //   email: user.email as string,
          //   profileImg: user.image as string,
          // });
          // Object.assign(user, _user); // jwt 콜백의 user 속성과 병합
        } catch (error) {
          if (error instanceof Error) {
            return `/error?message=${encodeURIComponent(error.message)}`;
          }
        }
        return !!profile?.email_verified;
      }
      if (account?.provider === "kakao") {
        try {
          console.log(account, profile, user);
          // 사용자 확인
          // const type = (await _existUser(user.email as string))
          //   ? "oauth/login"
          //   : "oauth/signup";
          // // 회원가입 또는 로그인
          // const _user = await _signIn(type, {
          //   displayName: user.name as string,
          //   email: user.email as string,
          //   profileImg: user.image as string,
          // });
          // Object.assign(user, _user); // jwt 콜백의 user 속성과 병합
        } catch (error) {
          if (error instanceof Error) {
            return `/error?message=${encodeURIComponent(error.message)}`;
          }
        }
        return !!profile?.email_verified;
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url) {
        const { search, origin } = new URL(url);
        const callbackUrl = new URLSearchParams(search).get("callbackUrl");
        if (callbackUrl)
          return callbackUrl.startsWith("/")
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl;
        if (origin === baseUrl) return url;
      }
      return baseUrl;
    },
  },
});
// 사용자 확인
async function _existUser(email: string) {
  console.log("ok");
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/exists`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       apikey: process.env.NEXT_PUBLIC_API_BASE_URL,
  //       username: process.env.NEXT_PUBLIC_API_BASE_URL,
  //       email,
  //     },
  //     cache: "no-store",
  //   }
  // );
  // return (await res.json()) as boolean;
}
async function _signIn(
  type: "signup" | "login" | "oauth/signup" | "oauth/login",
  body: {
    email: string;
    password?: string;
    displayName?: string;
    profileImg?: string;
  }
) {
  console.log(type + JSON.stringify(body) + "ok");
  return body;
}
// {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${type}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       apikey: process.env.NEXT_PUBLIC_API_BASE_URL,
//       username: process.env.NEXT_PUBLIC_API_BASE_URL
//     },
//     body: JSON.stringify(body),
//     cache: 'no-store'
//   })
//   const data = (await res.json()) as ResponseValue | string

//   if (res.ok && typeof data !== 'string') {
//     const { user, accessToken } = data
//     return {
//       email: user.email,
//       name: user.displayName,
//       image: user.profileImg,
//       accessToken
//     }
//   }

//   throw new Error(
//     (data as string) || '문제가 발생했습니다, 잠시 후 다시 시도하세요.'
//   )
// }
