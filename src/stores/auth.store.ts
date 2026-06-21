import { create } from "zustand";

interface AuthStore {
  userId: string | null;

  isLoading: boolean;

  setUserId: (userId: string | null) => void;

  setLoading: (value: boolean) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userId: localStorage.getItem("userId"),

  isLoading: false,

  setUserId: (userId) => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }

    set({
      userId,
    });
  },

  setLoading: (value) =>
    set({
      isLoading: value,
    }),

  logout: () => {
    localStorage.removeItem("userId");

    set({
      userId: null,
    });
  },
}));
