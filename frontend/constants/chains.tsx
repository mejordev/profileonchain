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
