"use client";
import { useForm } from "react-hook-form";
import {
  signInWithCredentials,
  signInWithGoogle,
  signInWithKakao,
} from "@/serverActions/auth";
import Image from "next/image";
import { useEffect } from "react";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    trigger, // 특정 필드의 유효성 검사 트리거
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // 입력 시마다 유효성 검사 모드 활성화
  });

  const onSubmit = async (data) => {
    const formData = new FormData(); // FormData 객체 생성

    // JSON 데이터를 FormData로 변환
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // FormData 서버 액션 호출
    await signInWithCredentials(formData);
  };

  // 입력 값 실시간 확인 (예: 디버깅용)
  useEffect(() => {
    console.log(watch("displayName"), watch("email"), watch("password"));
  }, [watch]);

  return (
    <main className="text-black mx-auto py-[4.5rem] px-4 w-[22.5rem] flex items-center flex-col">
      <div className="mb-6 w-full flex gap-1 items-center justify-center flex-col">
        <h2 className="no-underline font-bold text-[1.625rem] leading-[1.35] m-0">
          회원가입
        </h2>
        <div className="w-full text-center">
          <span className="">Baseball Community</span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-1 flex-col w-full signup-form"
      >
        {/* 사용자 이름 */}
        <label className="inline-block font-medium text-[rgb(33,37,41)] break-words cursor-default tap-highlight-transparent text-base">
          사용자 이름
        </label>
        <input
          placeholder="박건형"
          className={`form-input-currect ${
            errors.displayName ? "border-red-500" : ""
          }`}
          {...register("displayName", {
            required: "이름을 입력해주세요.",
          })}
          onBlur={() => trigger("displayName")} // focus out 시 검사
        />
        {errors.displayName && (
          <p className="text-red-500">{errors.displayName.message}</p>
        )}

        {/* 이메일 입력 */}
        <label className="mt-[3px]">이메일(ID)</label>
        <input
          placeholder="example@BS.com"
          className={`form-input-currect ${
            errors.email ? "border-red-500" : ""
          }`}
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "X 이메일 형식이 올바르지 않습니다.",
            },
          })}
          onBlur={() => trigger("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* 비밀번호 */}
        <label className="mt-[3px]">비밀번호</label>
        <input
          className={`form-input-currect ${
            errors.password ? "border-red-500" : ""
          }`}
          type="password"
          placeholder="********"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상이어야 합니다.",
            },
          })}
          onBlur={() => trigger("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button className="signup-btn mt-4" type="submit" disabled={!isValid}>
          <div className="flex items-center justify-center h-full overflow-visible pointer-events-none">
            <span className="whitespace-nowrap h-full overflow-hidden flex items-center">
              가입하기
            </span>
          </div>
        </button>
      </form>

      {/* OAuth 로그인 */}
      <div className="mt-8 w-full flex gap-6 items-center flex-col">
        <div className="easy-signup-box w-full flex gap-[0.375rem] items-center justify-center flex-row">
          <p className="easy-signup">간편 회원가입</p>
        </div>
        <ul className="flex gap-[0.5rem] relative">
          <li>
            {/* <form action={signInWithKakao}> */}
            <form>
              <button className="kakao-btn" type="submit">
                <Image src="/kakao.png" alt="kakao" width={30} height={30} />
              </button>
            </form>
          </li>
          <li>
            <form action={signInWithGoogle}>
              <button className="google-btn" type="submit">
                <Image src="/google.png" alt="google" width={30} height={30} />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </main>
  );
}
