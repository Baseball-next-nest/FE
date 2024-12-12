"use client";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "@/serverActions/auth";
import { useSessionStore } from "@/entities/SessionStore";
import { useModalStore } from "@/entities/ModalStore";

export const PostButton = () => {
  const router = useRouter();
  const { session, setSession } = useSessionStore();
  const { openLoginModal, closeLoginModal } = useModalStore();
  const [redirectToPost, setRedirectToPost] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  const goToPostPage = () => {
    if (session === null) {
      openLoginModal();
      setRedirectToPost(true); // 로그인 성공 시 페이지 이동 플래그 설정
    } else {
      router.push("/community/post");
    }
  };

  // 로그인 성공 후에만 페이지 이동
  useEffect(() => {
    if (redirectToPost && session !== null) {
      closeLoginModal();
      router.push("/community/post");
      setRedirectToPost(false);
    }
  }, [session, redirectToPost]);

  return (
    <button
      onClick={goToPostPage}
      className="create-button ml-2 flex items-center text-black p-2 rounded-[16px] hover:bg-gray-200"
    >
      <FaPlus className="mr-1" />
      <span>글쓰기</span>
    </button>
  );
};
