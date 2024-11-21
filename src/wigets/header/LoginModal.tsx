"use client";
import React, { useEffect } from "react";
import { useModalStore } from "../../entities/ModalStore";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signInWithCredentials, signInWithGoogle } from "@/serverActions/auth";
import { useForm } from "react-hook-form";
import { useSessionStore } from "@/entities/SessionStore";
import useLoadingStore from "@/entities/LoadingStore";
import LoadingSpinner from "@/features/loading/Loading";

type FormData = {
  email: string;
  password: string;
};

const LoginModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>();
  const { setLoading } = useLoadingStore();
  const { isLoginModalOpen, closeLoginModal } = useModalStore();
  const { setSession } = useSessionStore();
  useEffect(() => {
    // 페이지 이동을 감지하기 위해 pushState와 replaceState를 오버라이드.
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const handlePageChange = () => {
      if (isLoginModalOpen) {
        setTimeout(() => {
          closeLoginModal();
        }, 0);
      }
    };

    window.history.pushState = function (...args: any[]) {
      originalPushState.apply(window.history, args);
      handlePageChange();
    };

    window.history.replaceState = function (...args: any[]) {
      originalReplaceState.apply(window.history, args);
      handlePageChange();
    };

    // 컴포넌트 언마운트 시 원래 함수로 되돌리기
    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [isLoginModalOpen, closeLoginModal]);

  if (!isLoginModalOpen) return null;

  const handleClose = () => {
    reset(); // 입력 필드 초기화
    closeLoginModal(); // 모달 닫기
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  const onError = (errors) => {
    console.log("Validation failed:", errors);
    if (errors) {
      setLoading(true);
      window.alert("이메일 또는 비밀번호를 확인해주세요.");
      setLoading(false);
    }
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      setLoading(true);
      await signInWithCredentials(formData);
      window.location.reload();
    } catch (error) {
      window.alert("이메일 또는 비밀번호를 확인해주세요.");
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <LoadingSpinner />
      <article className="sign-up-modal">
        <span
          onClick={handleClose}
          className="flex text-black cursor-pointer text-2xl font-medium justify-end"
        >
          <IoIosClose />
        </span>
        <h2 className="mb-[18px] flex justify-center text-black">
          BaseBall Community
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-4 mb-4"
        >
          <div className="">
            <div className="mb-[12px]">
              <input
                placeholder="이메일"
                type="email"
                {...register("email", { required: "이메일을 입력하세요." })}
                className="form-sign-up"
              />
            </div>
            <div>
              <input
                placeholder="비밀번호"
                type="password"
                {...register("password", {
                  required: "비밀번호를 입력하세요.",
                })}
                className="form-sign-up"
              />
            </div>
          </div>
          <button type="submit" className="signup-btn">
            <div className="flex items-center justify-center h-full overflow-visible pointer-events-none">
              <span className="text-sm whitespace-nowrap h-full overflow-hidden flex items-center">
                로그인
              </span>
            </div>
          </button>
        </form>
        <p className="flex justify-center items-center mb-4">
          <span className="text-[13px] font-normal text-[#616568] border-b border-[#858a8d] cursor-pointer leading-[1.38] tracking-[-0.3px]">
            <Link href={"/signup"}>회원가입</Link>
          </span>
        </p>
        <div className="mt-8 w-full flex gap-6 items-center flex-col">
          <div className="easy-signup-box w-full flex gap-[0.375rem] items-center justify-center flex-row">
            <p className="easy-signup">간편 로그인</p>
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
              <form action={signInWithGoogle}>
                <button className="google-btn" type="submit">
                  <Image
                    src="/google.png"
                    alt="google"
                    width={30}
                    height={30}
                  />
                </button>
              </form>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
};

export default LoginModal;
