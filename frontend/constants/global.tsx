import { createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { base, baseSepolia, Chain, optimism } from 'viem/chains';
import { ConfigChain } from '@/store/types';

export const API_URL = 'http://localhost:4000';

export const CHAIN_CONFIGS: ConfigChain[] = [
  {
    chain: baseSepolia,
    chainLogo: '/img/chains/base-logo.png',
    routerContract:
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as `0x${string}`,
  },
  {
    chain: optimism,
    chainLogo: '/img/chains/optimism-logo.png',
    routerContract:
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as `0x${string}`,
  },
];

export const CHAINS_LIST = CHAIN_CONFIGS.map(config => config.chain) as [
  Chain,
  ...Chain[],
];

if (CHAINS_LIST.length === 0) {
  throw new Error('CHAINS_LIST is empty');
}

export const ConfigWagmi = createConfig({
  chains: CHAINS_LIST,
  transports: CHAINS_LIST.reduce((acc, chain) => {
    acc[chain.id] = http();
    return acc;
  }, {} as Record<number, ReturnType<typeof http>>),
  connectors: [injected()],
});

export const DEFAULT_CHAIN = CHAIN_CONFIGS[0];
