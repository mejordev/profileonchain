import { create } from 'zustand';
import { UserData } from './types';

export interface UserStore {
  name: string | undefined;
  description: string | undefined;
  avatarUrl: string | undefined;
  website: string | undefined;
  bitcoin: string | undefined;
  ethereum: string | undefined;
  solana: string | undefined;
  polkadot: string | undefined;
  ton: string | undefined;
  litecoin: string | undefined;
  ripple: string | undefined;
  actions: {
    setAddress: (ethereum: string | undefined) => void;
    setUser: (user: UserData | undefined) => void;
    setAddresses: (addresses: Partial<UserStore>) => void;
    updateField: (field: keyof UserStore, value: string | undefined) => void;
  };
}

export const useUserStore = create<UserStore>()((set, get) => ({
  name: undefined,
  description: undefined,
  avatarUrl: undefined,
  website: undefined,
  bitcoin: undefined,
  ethereum: undefined,
  solana: undefined,
  polkadot: undefined,
  ton: undefined,
  litecoin: undefined,
  ripple: undefined,
  actions: {
    setAddress: ethereum => set({ ethereum }),

    setUser: user => {
      if (user) {
        set({
          name: user.name,
          description: user.description,
          avatarUrl: user.avatarUrl,
          website: user.website,
          bitcoin: user.bitcoin,
          ethereum: user.ethereum,
          solana: user.solana,
          polkadot: user.polkadot,
          ton: user.ton,
          litecoin: user.litecoin,
          ripple: user.ripple,
        });
      } else {
        set({
          name: undefined,
          description: undefined,
          avatarUrl: undefined,
          website: undefined,
          bitcoin: undefined,
          ethereum: undefined,
          solana: undefined,
          polkadot: undefined,
          ton: undefined,
          litecoin: undefined,
          ripple: undefined,
        });
      }
    },
    setAddresses: addresses => set(addresses),
    updateField: (field, value) => set({ [field]: value }),
  },
}));

export const useUser = () => useUserStore(state => state);

export const useUserActions = () => useUserStore(state => state.actions);
