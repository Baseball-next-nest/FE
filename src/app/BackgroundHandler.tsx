"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BackgroundHandler() {
  const pathname = usePathname();
  console.log(pathname);
  useEffect(() => {
    const mainElement = document.querySelector("main");
    const headerElement = document.querySelector("header");

    if (pathname === "/signup") {
      if (mainElement) {
        mainElement.style.backgroundColor = "white";
      }
      if (headerElement) {
        headerElement.style.display = "none";
      }
    }
    // else if (pathname === "/community") {
    //   if (mainElement) {
    //     mainElement.style.backgroundColor = "black";
    //   }
    // }
    else {
      if (mainElement) {
        mainElement.style.backgroundColor = "";
      }
      if (headerElement) {
        headerElement.style.display = "";
      }
    }
  }, [pathname]);

  return null;
}
