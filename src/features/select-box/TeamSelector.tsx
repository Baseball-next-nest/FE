"use client";

import { useTeamStore } from "@/entities/TeamStore";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const teams = [
  { name: "두산 베어스", logo: "/logos/doosan.svg", team: "doosan" },
  { name: "LG 트윈스", logo: "/logos/lg.svg", team: "lg" },
  { name: "NC 다이노스", logo: "/logos/nc.svg", team: "nc" },
  { name: "SSG 랜더스", logo: "/logos/ssg.svg", team: "ssg" },
  { name: "KT 위즈", logo: "/logos/kt.svg", team: "kt" },
  { name: "KIA 타이거즈", logo: "/logos/kia.svg", team: "kia" },
  { name: "롯데 자이언츠", logo: "/logos/lotte.svg", team: "lotte" },
  { name: "삼성 라이온즈", logo: "/logos/samsung.svg", team: "samsung" },
  { name: "키움 히어로즈", logo: "/logos/kiwoom.svg", team: "kiwoom" },
  { name: "한화 이글스", logo: "/logos/hanhwa.png", team: "hanhwa" },
];

export default function TeamSelector() {
  const { selectedTeam, isDropdownOpen, toggleDropdown, selectTeam } =
    useTeamStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div ref={dropdownRef} className="relative w-64 self-start ml-12">
      {/* 선택된 항목 버튼 */}
      <button
        onClick={toggleDropdown}
        className="w-full rounded-full border border-gray-300 p-2 px-4 py-2 text-sm focus:border-transparent focus:shadow-md focus:outline-none flex items-center justify-between gap-2"
      >
        {selectedTeam ? (
          <div className="flex">
            <Image
              src={selectedTeam.logo}
              alt={selectedTeam.name}
              width={24}
              height={24}
              className="rounded-full mr-1"
            />
            {selectedTeam.name}
          </div>
        ) : (
          "팀을 선택해주세요"
        )}
        {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {/* 드롭다운 */}
      {isDropdownOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
          {teams.map((team) => (
            <li
              key={team.name}
              onClick={() => selectTeam(team)}
              className={`px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2 text-sm ${
                selectedTeam?.name === team.name ? "bg-gray-100 font-bold" : ""
              }`}
            >
              <Image
                src={team.logo}
                alt={team.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              {team.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
