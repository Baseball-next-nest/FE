/* 
  useclient사용으로 인한 async 함수 사용 불가로 컴포넌트 분리
*/
import Link from "next/link";
import { signOutWithForm } from "@/serverActions/auth";

export default async function AuthSection({ session }) {
  return (
    <>
      {session?.user ? (
        <>
          <form action={signOutWithForm}>
            <button type="submit">로그아웃</button>
          </form>
        </>
      ) : (
        <>
          <Link
            href="/signin"
            className="rounded-md px-3 py-2 text-sm text-black"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="rounded-md px-3 py-2 text-sm text-black"
          >
            회원가입
          </Link>
        </>
      )}
    </>
  );
}
