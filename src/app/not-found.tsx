"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">페이지를 찾을 수 없습니다.</p>
      <p className="text-sm text-gray-500 mt-2">
        요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
