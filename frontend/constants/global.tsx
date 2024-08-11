import { createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { base, baseSepolia, Chain, optimism } from 'viem/chains';
import { ConfigChain } from '@/store/types';
import {
  customBaseSepolia,
  virtual_base_sepolia,
  virtual_optimistic_ethereum,
} from './chains';
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';

export const API_URL = 'http://localhost:4000';
export const SCHEMA =
  'string name,string description,string avatarUrl,string website,string bitcoin,address ethereum,string solana,string polkadot,string ton,string litecoin,string ripple';

export const SCHEMA_UID =
  '0xe096c284b6f5436ee1d6536638984a32508e56973def5be08191f60e9a12c279';
export const EAS_CONTRACT_ADDRESS =
  '0x4200000000000000000000000000000000000021';

export const schemaEncoder = new SchemaEncoder(SCHEMA);
export const CHAIN_CONFIGS: ConfigChain[] = [
  {
    chain: customBaseSepolia,
    chainLogo: '/img/chains/base-logo.png',
    routerContract:
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as `0x${string}`,
  },
  // {
  //   chain: virtual_base_sepolia,
  //   chainLogo: '/img/chains/base-logo.png',
  //   routerContract:
  //     '0xE62Fd71c88EB706E657990d758DAc47bEFe82cC4' as `0x${string}`,
  // },
  {
    chain: virtual_optimistic_ethereum,
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
