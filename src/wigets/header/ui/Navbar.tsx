"use client";
import { usePathname } from "next/navigation";
import { setNavbarPages, useNavbarStore } from "@/entities";
import Link from "next/link";
import { useEffect } from "react";

const Navbar: React.FC = () => {
  const currentPage = usePathname();

  const pages = useNavbarStore((state) =>
    state.pages.map((page) => ({
      ...page,
      current: page.href === currentPage,
    }))
  );

  useEffect(() => {
    setNavbarPages(currentPage);
  }, [currentPage]);

  return (
    <nav className="mx-auto mt-8 flex max-w-screen-xl items-center justify-between">
      <ul className="container mx-auto flex justify-start space-x-6">
        {pages.map((page) => (
          <li key={page.href}>
            <Link href={{ pathname: page.href }} legacyBehavior>
              <a
                className={`text-md font-medium ${
                  page.current ? "link-active" : "custom-underline"
                }`}
              >
                {page.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
