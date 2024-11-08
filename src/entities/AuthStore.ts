import { create } from "zustand";
//signin
interface AuthState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  reset: () => set({ email: "", password: "" }),
}));
