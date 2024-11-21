"use client";
import { useForm } from "react-hook-form";
import {
  signInWithCredentials,
  signInWithGoogle,
  signInWithKakao,
} from "@/serverActions/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/entities/LoadingStore";
import LoadingSpinner from "@/features/loading/Loading";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // 필드 focus를 잃었을 때 유효성 검사 실행
  });

  const router = useRouter();

  const { setLoading } = useLoadingStore();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      setLoading(true);
      await signInWithCredentials(formData);
      router.push("/");
    } catch (err) {
      console.error("회원가입 실패", err);
    } finally {
      setLoading(false);
    }
  };
  const socialSignup = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.error("회원가입 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvalid = async (data: any) => {
    // 유효성 검사가 실패한 첫 번째 필드에 focus 설정
    for (const key of Object.keys(data)) {
      if (data[key]) {
        setFocus(key);
        break;
      }
    }
  };

  return (
    <main className="text-black mx-auto py-[4.5rem] px-4 w-[22.5rem] flex items-center flex-col">
      <LoadingSpinner />
      <div className="mb-6 w-full flex gap-1 items-center justify-center flex-col">
        <h2 className="no-underline font-bold text-[1.625rem] leading-[1.35] m-0">
          회원가입
        </h2>
        <div className="w-full text-center">
          <span className="">Baseball Community</span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, handleInvalid)}
        className="flex gap-1 flex-col w-full signup-form"
      >
        {/* 사용자 이름 */}
        <label className="inline-block font-medium text-[rgb(33,37,41)] break-words cursor-default tap-highlight-transparent text-base">
          사용자 이름
        </label>
        <input
          placeholder="박건형"
          className={`form-input-currect ${
            errors.nickname ? "border-red-500 focus:border-red-500" : ""
          }`}
          {...register("nickname", {
            required: "이름을 입력해주세요.",
          })}
        />
        {errors.nickname && (
          <p className="text-red-500">{errors.nickname.message}</p>
        )}

        {/* 이메일 입력 */}
        <label className="mt-[3px]">이메일(ID)</label>
        <input
          placeholder="example@BS.com"
          className={`form-input-currect ${
            errors.email ? "red-border focus:red-border" : ""
          }`}
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "X 이메일 형식이 올바르지 않습니다.",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* 비밀번호 */}
        <label className="mt-[3px]">비밀번호</label>
        <input
          className={`form-input-currect ${
            errors.password ? "red-border focus:red-border" : ""
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
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button className="signup-btn mt-4" type="submit">
          <div className="flex items-center justify-center h-full overflow-visible pointer-events-none">
            <span className="whitespace-nowrap h-full overflow-hidden flex items-center">
              가입하기
            </span>
          </div>
        </button>
      </form>

      {/* OAuth 회원가입 */}
      <div className="mt-8 w-full flex gap-6 items-center flex-col">
        <div className="easy-signup-box w-full flex gap-[0.375rem] items-center justify-center flex-row">
          <p className="easy-signup">간편 회원가입</p>
        </div>
        <ul className="flex gap-[0.5rem] relative">
          <li>
            <form>
              <button className="kakao-btn" type="submit">
                <Image src="/kakao.png" alt="kakao" width={30} height={30} />
              </button>
            </form>
          </li>
          <li>
            <form action={socialSignup}>
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
