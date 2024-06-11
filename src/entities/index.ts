import { create } from "zustand";

type Page = {
  name: string;
  href: string;
  current: boolean;
};

type NavbarStore = {
  pages: Page[];
  setPages: (pages: Page[]) => void;
};

export const useNavbarStore = create<NavbarStore>((set) => ({
  pages: [],
  setPages: (pages) => set({ pages }),
}));

export const setNavbarPages = (currentPage: string) => {
  const pages: Page[] = [
    { name: "기록실", href: "/stats", current: currentPage === "/stats" },
    { name: "시즌정보", href: "/season", current: currentPage === "/season" },
    { name: "팀정보", href: "/team", current: currentPage === "/team" },
    { name: "선수정보", href: "/player", current: currentPage === "/player" },
    { name: "일정", href: "/schedule", current: currentPage === "/schedule" },
  ];
  useNavbarStore.setState({ pages });
};
