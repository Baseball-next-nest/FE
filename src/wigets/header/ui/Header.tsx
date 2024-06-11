"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import { setNavbarPages } from "@/entities";

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Header() {
  useEffect(() => {
    setNavbarPages("/");
  }, []);
  return (
    <header className="bg-white p-4 text-black shadow-md">
      <nav className="mx-auto flex max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl text-black">
            <Link href="/">Logo</Link>
          </div>
          <input
            type="text"
            placeholder="검색을 해보세요"
            className="w-96 rounded-full border border-gray-300 p-2 px-4 py-2 text-sm focus:border-transparent focus:shadow-md focus:outline-none"
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
