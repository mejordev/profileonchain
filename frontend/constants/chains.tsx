import { defineChain } from 'viem';
import { baseSepolia } from 'viem/chains';

export const customBaseSepolia = {
  ...baseSepolia,
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://base-sepolia.blockscout.com',
      apiUrl: 'https://api-sepolia.basescan.org/api',
    },
  },
};

export const virtual_optimistic_ethereum = defineChain({
  id: 10,
  name: 'Virtual Optimistic Ethereum',
  nativeCurrency: { name: 'VETH', symbol: 'VETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://virtual.optimism.rpc.tenderly.co/fe56c8ee-433f-4493-a335-aba18d33393c',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Tenderly Explorer',
      url: 'https://dashboard.tenderly.co/explorer/vnet/4e398a7c-e825-4437-9e03-cdeed37d6c60',
    },
  },
});

export const virtual_base_sepolia = defineChain({
  id: 84532,
  name: 'Virtual Base Sepolia',
  nativeCurrency: { name: 'VETH', symbol: 'VETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://virtual.base-sepolia.rpc.tenderly.co/9d9813ae-2960-4d92-9e4d-19df3a05e04a',
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'Tenderly Explorer',
      url: 'https://virtual.base-sepolia.rpc.tenderly.co/99ef4b8b-95a9-4bc9-aa03-f263852ff255',
    },
  },
});
