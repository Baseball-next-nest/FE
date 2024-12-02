"use client";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSession } from "@/serverActions/auth";
import { useSessionStore } from "@/entities/SessionStore";
import { useModalStore } from "@/entities/ModalStore";
export const PostButton = () => {
  const router = useRouter();
  const { session, setSession } = useSessionStore();
  const { openLoginModal } = useModalStore();
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  const goToPostPage = () => {
    console.log(session);
    if (session === null) {
      openLoginModal();
    } else {
      router.push("/community/post");
    }
    // router.push("/community/post");
  };
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
