import { create } from "zustand";

// 상태 타입 정의
interface LoadingState {
  isLoading: boolean; // 로딩 상태
  setLoading: (loading: boolean) => void; // 로딩 상태를 변경하는 함수
}

// Zustand Store 생성
const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false, // 초기 상태
  setLoading: (loading) => set({ isLoading: loading }), // 상태 변경 함수
}));

export default useLoadingStore;
