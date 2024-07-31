"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import { SearchInput } from "@/features/input/SearchInput";
import { getPlayerNameData } from "@/app/api/api";
import { useRouter } from "next/navigation";

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const setSearchPlayer = (e) => {
    setSearchTerm(e.target.value);
  };
  const onSearchPlayer = async (e) => {
    if (e.key === "Enter") {
      const playerData = await getPlayerNameData(searchTerm);
      const playerId = playerData[0].id;
      router.push(`http://localhost:3000/player/detail?id=${playerId}`);
      setSearchTerm("");
    }
  };
  // useEffect(() => {
  //   setNavbarPages("/");
  // }, []);
  return (
    <header className="bg-white p-4 text-black shadow-md">
      <nav className="mx-auto flex max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl text-black">
            <Link href="/">BS</Link>
          </div>
          <SearchInput
            value={searchTerm}
            onChange={setSearchPlayer}
            onKeyDown={onSearchPlayer}
            placeholder="선수를 검색해보세요."
          />
        </div>
        <div>
          <a href="#" className="rounded-md px-3 py-2 text-sm text-black">
            로그인
          </a>
          <a href="#" className="rounded-md px-3 py-2 text-sm text-black">
            회원가입
          </a>
        </div>
      </nav>
      <Navbar />
    </header>
  );
}
