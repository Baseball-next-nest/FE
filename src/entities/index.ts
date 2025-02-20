"use client";
import { create } from "zustand";

// player detail table th
type HitterStatsLabels = {
  HitterLabels: string[];
  setHitterLabels: (labels: string[]) => void;
};

export const useHitterStatsLabelsStore = create<HitterStatsLabels>((set) => ({
  HitterLabels: [
    "타율",
    "경기수",
    "타수",
    "안타",
    "2루타",
    "3루타",
    "홈런",
    "타점",
    "득점",
    "도루",
    "볼넷",
    "삼진",
    "출루율",
    "장타율",
    "OPS",
    // "IsoP",
    // "BABIP",
    // "wOBA",
    "wRC+",
    // "WPA",
    "WAR",
  ],
  setHitterLabels: (labels) => set({ labels }),
}));

type PitcherStatsLabels = {
  PitcherLabels: string[];
  setPitcherLabels: (labels: string[]) => void;
};

export const usePitcherStatsLabelsStore = create<PitcherStatsLabels>((set) => ({
  PitcherLabels: [
    "평균자책",
    "경기수",
    "이닝",
    "승",
    "패",
    "세이브",
    "홀드",
    "탈삼진",
    "피안타",
    "피홈런",
    "실점",
    "볼넷",
    "사구",
    // "승률",
    "WHIP",
    // "K/9",
    // "BB/9",
    // "K/BB",
    // "K%",
    // "BB%",
    // "WPA",
    "FIP",
    "WAR",
  ],
  setPitcherLabels: (labels) => set({ labels }),
}));

//  Navbar
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
    {
      name: "게시판",
      href: "/community",
      current: currentPage === "/community",
    },
    // { name: "기록실", href: "/stats", current: currentPage === "/stats" },
    // { name: "시즌정보", href: "/season", current: currentPage === "/season" },
    // { name: "팀정보", href: "/team", current: currentPage === "/team" },
    // { name: "일정", href: "/schedule", current: currentPage === "/schedule" },
    {
      name: "선수정보",
      href: "/player",
      current: currentPage === "/player",
    },
  ];
  useNavbarStore.setState({ pages });
};
