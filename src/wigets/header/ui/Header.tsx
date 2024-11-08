"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import { SearchInput } from "@/features/input/SearchInput";
import { getPlayerNameData } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/session";
import { useModalStore } from "@/entities/ModalStore";

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
  const session = useSession();
  console.log(session);
  const { openLoginModal } = useModalStore();
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
        <button onClick={openLoginModal} className="login-button">
          로그인
        </button>
      </nav>
      <Navbar />
    </header>
  );
}
