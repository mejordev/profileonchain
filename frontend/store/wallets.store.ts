import { create } from 'zustand';

export interface WalletsStore {
  walletsLog: string;
  isCopied: boolean;
  ethereumPrivKey: string;
  actions: {
    setCopied: (isCopied: boolean) => void;
    setWalletsLog: (walletsLog: string) => void;
    setEthereumPrivKey: (ethereumPrivKey: string) => void;
    reset: () => void;
  };
}

export const useWalletsStore = create<WalletsStore>()((set, get) => ({
  walletsLog: '',
  isCopied: false,
  ethereumPrivKey: '',
  actions: {
    setCopied: (isCopied: boolean) => set({ isCopied }),
    setWalletsLog: (walletsLog: string) => set({ walletsLog }),
    setEthereumPrivKey: (ethereumPrivKey: string) => set({ ethereumPrivKey }),
    reset: () => set({ walletsLog: '', isCopied: false, ethereumPrivKey: '' }),
  },
}));

export const useWallets = () => useWalletsStore(state => state);

export const useWalletsActions = () => useWalletsStore(state => state.actions);
