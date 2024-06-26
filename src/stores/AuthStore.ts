import { create } from "zustand";
import { IUser } from "../interfaces/userInterfaces";

interface IAuthStore {
  user: IUser | null;
  setUser: (user: IUser|null) => void;
  accessToken?: string;
  refreshToken?: string;
  setTokens: (token: { access_token: string; refresh_token: string }) => void;
  clearTokens: () => void;
}

const authStore = create<IAuthStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  setTokens: (tokens) => {
    localStorage.setItem("accessToken", tokens.access_token);
    localStorage.setItem("refreshToken", tokens.refresh_token);
    set({ accessToken: tokens.access_token, refreshToken: tokens.refresh_token });
  },
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ refreshToken: "", accessToken: "" });
  }
}));

export default authStore;