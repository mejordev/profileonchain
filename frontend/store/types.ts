import { Chain } from "viem";

export type ConfigChain = {
    chain: Chain;
    chainLogo: string;
    routerContract: `0x${string}`;
  };

export type User = {
    address: string | undefined;
    displayName: string | undefined;
    description: string | undefined;
    avatarUrl: string | undefined;
};