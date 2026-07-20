import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("admin_token"),
  setToken: (token) => {
    if (token) {
      localStorage.setItem("admin_token", token);
    } else {
      localStorage.removeItem("admin_token");
    }
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("admin_token");
    set({ token: null });
    window.location.href = "/";
  },
}));
