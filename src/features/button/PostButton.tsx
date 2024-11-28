"use client";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
export const PostButton = () => {
  const router = useRouter();
  const goToPostPage = () => {
    router.push("/community/post");
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
