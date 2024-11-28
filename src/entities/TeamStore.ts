import { create } from "zustand";

interface TeamStore {
  selectedTeam: string | null;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  selectTeam: (team: string) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  selectedTeam: null,
  isDropdownOpen: false,
  toggleDropdown: () =>
    set((state) => ({ isDropdownOpen: !state.isDropdownOpen })),
  selectTeam: (team) => set({ selectedTeam: team, isDropdownOpen: false }), // 팀 선택 후 드롭다운 닫기
}));
