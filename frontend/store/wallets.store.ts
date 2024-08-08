import { create } from 'zustand';

export interface WalletsStore {
  walletsLog: string;
  isCopied: boolean;
  actions: {
    setCopied: (isCopied: boolean) => void;
    setWalletsLog: (walletsLog: string) => void;
    reset: () => void;
  };
}

export const useWalletsStore = create<WalletsStore>()((set, get) => ({
  walletsLog: '',
  isCopied: false,
  actions: {
    setCopied: (isCopied: boolean) => set({ isCopied }),
    setWalletsLog: (walletsLog: string) => set({ walletsLog }),
    reset: () => set({ walletsLog: '', isCopied: false }),
  },
}));

export const useWallets = () => useWalletsStore(state => state);

export const useWalletsActions = () => useWalletsStore(state => state.actions);
