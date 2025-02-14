"use client";

import { FC, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import { fetchSortedComments } from "@/app/api/api";
import { useTeamStore } from "@/entities/TeamStore";

interface SortBySelectProps {
  onSortChange: (posts: any[]) => void;
  initialSort?: string;
  postId: number;
  userId: number;
}

const sortOptions = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
  { label: "답글순", value: "reply" },
];

export const SortBySelect: FC<SortBySelectProps> = ({
  onSortChange,
  postId,
  userId,
  initialSort = "recent",
}) => {
  const [selected, setSelected] = useState(
    sortOptions.find((option) => option.value === initialSort)?.label ||
      "최신순"
  );
  const { isDropdownOpen, toggleDropdown } = useTeamStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fetchSortedPosts = async (sortOption: string) => {
    try {
      const post_id = Number(postId);
      const user_id = Number(userId);
      const res = await fetchSortedComments(sortOption, post_id, user_id);
      onSortChange(res);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      alert("게시물 목록을 가져오는데 실패했습니다.");
    }
  };

  const handleOptionClick = (option: { label: string; value: string }) => {
    setSelected(option.label);
    toggleDropdown();
    fetchSortedPosts(option.value);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isDropdownOpen) toggleDropdown(); // 드롭다운이 열려있을 때만 닫기
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, toggleDropdown]);
  return (
    <div
      ref={dropdownRef}
      className="relative flex items-center w-50 mt-2 ml-3"
    >
      <span className="flex mr-2 flex-none neutral-content text-12 whitespace-nowrap">
        정렬기준:
      </span>
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50"
      >
        <span>{selected}</span>
        <IoIosArrowDown className="w-4 h-4" />
      </button>

      {isDropdownOpen && (
        <ul className="absolute z-10 mt-[7.5rem] w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={clsx(
                "px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-100",
                selected === option.label && "bg-blue-100 font-medium"
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
