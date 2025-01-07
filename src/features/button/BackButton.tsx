"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
export const BackButton = () => {
  const router = useRouter();
  const backToCommunity = () => {
    router.push("/community");
  };
  return (
    <button
      onClick={backToCommunity}
      className="flex justify-center items-center w-[32px] h-[32px] rounded-[16px] hover:bg-gray-200"
    >
      <IoMdArrowBack className="w-[24px] h-[24px]" />
    </button>
  );
};
