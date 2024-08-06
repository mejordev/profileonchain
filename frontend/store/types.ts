import { Chain } from 'viem';

export type ConfigChain = {
  chain: Chain;
  chainLogo: string;
  routerContract: `0x${string}`;
};

export type User = {
  name: string;
  description: string;
  avatarUrl: string | undefined;
  website: string;
  wallets: Wallets;
  signed: string;
};

export type Wallets = {
  bitcoin?: string;
  ethereum?: string;
  solana?: string;
  polkadot?: string;
  ton?: string;
  litecoin?: string;
  ripple?: string;
};

export type UserData = {
  name: string;
  description?: string;
  avatarUrl?: string;
  website?: string;
  bitcoin: string;
  ethereum: string;
  solana: string;
  polkadot: string;
  ton: string;
  litecoin: string;
  ripple: string;
};
