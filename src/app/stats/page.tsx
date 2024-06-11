"use client";
import { useNavbarStore } from "@/entities";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function stats() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("stats");
  console.log(search);
  const pages = useNavbarStore((state) =>
    state.pages.map((page) => ({
      ...page,
    }))
  );
  console.log(pages);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{pathName}</p>
    </main>
  );
}
