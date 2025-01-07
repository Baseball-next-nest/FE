"use client";
import { deleteCommunityPost } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

interface DropdownMenuProps {
  postId: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ postId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEdit = () => {
    router.push(`/community/edit/${postId}`);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("해당 글을 삭제하시겠습니까?");
    console.log(postId);
    const id = Number(postId);
    console.log(id);
    if (confirmDelete) {
      console.log(id);
      await deleteCommunityPost(id);
      setIsOpen(false);
      router.push("/community");
    } else {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Kebab Icon */}
      <span
        className="w-[32px] h-[32px] flex items-center pb-1 cursor-pointer"
        onClick={toggleMenu}
        role="button"
        aria-label="Open menu"
      >
        <CiMenuKebab className="w-[24px] h-[24px]" />
      </span>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-20">
          <button
            className="w-full px-2 py-2 flex justify-center items-center text-gray-700 hover:bg-gray-100"
            onClick={handleEdit}
          >
            {/* <IoCreateOutline className="w-[16px] h-[16px]" /> */}

            <span>수정</span>
          </button>
          <button
            className="w-full px-2 py-2 flex justify-center items-center text-gray-700 hover:bg-gray-100"
            onClick={handleDelete}
          >
            {/* <MdDeleteForever className="w-[16px] h-[16px]" /> */}
            <span>삭제</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
