"use client";
import React, { useEffect } from "react";
import { useModalStore } from "../../entities/ModalStore";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal } = useModalStore();

  useEffect(() => {
    // 페이지 이동을 감지하기 위해 pushState와 replaceState를 오버라이드.
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const handlePageChange = () => {
      if (isLoginModalOpen) {
        closeLoginModal();
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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeLoginModal();
    }
  };
  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <article className="sign-up-modal">
        <span
          onClick={closeLoginModal}
          className="flex text-black cursor-pointer text-2xl font-medium justify-end"
        >
          <IoIosClose />
        </span>
        <h2 className="mb-[18px] flex justify-center text-black">
          BaseBall Community
        </h2>
        <form className="space-y-4 mb-4">
          <div className="">
            <div className="mb-[12px]">
              <input
                placeholder="이메일"
                type="text"
                className="form-sign-up"
              />
            </div>
            <div>
              <input
                placeholder="비밀번호"
                type="password"
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
              <form>
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
