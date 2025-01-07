"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import useLoadingStore from "@/features/loading/store";

const RouterLoadingHandler = () => {
  const router = useRouter();
  const { isLoading, setLoading } = useLoadingStore();
  console.log(isLoading);
  useEffect(() => {
    const handleStart = () => setLoading(true); // 로딩 시작
    const handleComplete = () => setLoading(false); // 로딩 종료

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, setLoading]);

  return null;
};

export default RouterLoadingHandler;
