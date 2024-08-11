# ProfileOnChain

**ProfileOnChain** is a simple, user-friendly platform that allows you to set up a crypto donation profile in just a few clicks. With ProfileOnChain, you can start receiving cryptocurrency donations directly to your wallets, even if you're new to the world of crypto.

## Features

- **Quick Setup**: No prior cryptocurrency knowledge required. Just a few clicks to create your profile.
- **Automatic Wallet Generation**: Wallets are generated for you, which you need to save. These wallets are then linked to your public addresses on-chain using Ethereum Attestation Service (EAS) on Base-Sepolia: [https://base-sepolia.easscan.org/schema](https://base-sepolia.easscan.org/schema/view/0xe096c284b6f5436ee1d6536638984a32508e56973def5be08191f60e9a12c279)
- **Virtual Testnet Integration**: The project uses Tenderly's virtual testnet, including an Optimism Mainnet fork, for deploying and verifying contracts.
- **Offline Profile Option**: Create an offline profile that remains valid for a certain period. After this period, payment is required to create an on-chain profile.
- **Custom Block Explorer**: Transactions can be viewed on Blockscout, where you can check your account and transaction history.

## Demo

Check out the live demo of ProfileOnChain: [https://profileonchain.vercel.app/](https://profileonchain.vercel.app/)

## Current Limitations

- **Beta Version**: The website is currently in beta. QR codes may not be generated correctly.
- **Profile Stats & Editing**: Profile statistics and editing functionalities are not available in this version.

## How to Run This Project Locally

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

### Installation

1. **Clone the Repository**:
   Next go to frontend directory and install npm and run dev

```bash
cd frontend
npm install
npm run dev
```
