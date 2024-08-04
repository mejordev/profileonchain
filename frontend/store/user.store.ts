import { create } from "zustand";
import { User } from "./types";


interface UserStore {
  address: string | undefined;
  displayName: string | undefined;
  description: string | undefined;
  avatarUrl: string | undefined;
  actions: {
    setAddress: (address: string | undefined) => void;
    setUser: (user: User | undefined) => void;
  };
}

export const useUserStore = create<UserStore>()((set, get) => ({
  address: undefined,
  displayName: undefined,
  description: undefined,
  avatarUrl: undefined,
  actions: {
    setAddress: (address) => set({ address }),
    setUser: (user) => {
      if (user) {
        set({ ...user });
      } else {
        set({
          address: undefined,
          displayName: undefined,
          description: undefined,
          avatarUrl: undefined,
        });
      }
    },
  },
}));

export const useUser = () => useUserStore((state) => state);

export const useUserActions = () => useUserStore((state) => state.actions);
