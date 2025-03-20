"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import { SearchInput } from "@/features/input/SearchInput";
import { getPlayerNameData } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/entities/ModalStore";
import { getSession, signOutWithForm } from "@/serverActions/auth";
import { useSessionStore } from "@/entities/SessionStore";
import { _existUser } from "../../../../auth";

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { session, setSession, clearSession } = useSessionStore();
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

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);
  const logout = async (event) => {
    event.preventDefault();
    try {
      await signOutWithForm(session);
      clearSession();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    router.push("/");
  };
  const { openLoginModal } = useModalStore();
  return (
    <header className="bg-white p-4 text-black shadow-md sticky top-0 z-50">
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

        {session?.user ? (
          <>
            <form className="flex items-center" onSubmit={logout}>
              <span className="mr-2 font-medium text-sm">
                {session.user.nickname}님
              </span>
              <button className="login-button" type="submit">
                로그아웃
              </button>
            </form>
          </>
        ) : (
          <>
            <button onClick={openLoginModal} className="login-button">
              로그인
            </button>
            {/* <button onClick={check}>체크체크</button> */}
          </>
        )}
      </nav>
      <Navbar />
    </header>
  );
}
