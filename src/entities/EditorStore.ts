import { create } from "zustand";

interface EditorState {
  content: string; // Rich Text 내용
  setContent: (content: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  content: "", // 초기 상태
  setContent: (content) => set({ content }),
}));
