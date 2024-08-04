import { Keypair as SolanaKeypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { mnemonicNew, mnemonicToPrivateKey } from "@ton/crypto";
import { WalletContractV4 } from '@ton/ton/dist/wallets/WalletContractV4';
import { mnemonicGenerate, mnemonicToMiniSecret, encodeAddress, cryptoWaitReady } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import { HDKey, mnemonicToAccount, privateKeyToAccount } from 'viem/accounts';
import * as xrpl from 'xrpl';

const logWalletDetails = (type: string, details: any) => {
  console.log(`${type} Wallet:`);
  Object.entries(details).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  console.log('---------------------------');
};

export const generateBitcoinWallet = () => {
  const mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hdKey = HDKey.fromMasterSeed(seed);
  const child = hdKey.derive("m/44'/0'/0'/0/0");
  const publicKey = child.publicKey;
  const { address } = bitcoin.payments.p2pkh({ pubkey: Buffer.from(publicKey!.buffer) });

  logWalletDetails('Bitcoin', {
    Address: address,
    Mnemonic: mnemonic,
    Seed: Buffer.from(child.privateKey!.buffer).toString('hex') || 'No private key available'
  });
};

export const generatePolkadotWallet = async () => {
  await cryptoWaitReady();
  const mnemonic = mnemonicGenerate();
  const seed = mnemonicToMiniSecret(mnemonic);
  const keyring = new Keyring({ type: 'sr25519' });
  const keypair = keyring.addFromSeed(seed);
  const address = encodeAddress(keypair.publicKey, 42);
  logWalletDetails('Polkadot', {
    Mnemonic: mnemonic,
    Address: address
  });
};

export const generateTonWallet = async () => {
  const mnemonics = await mnemonicNew();
  const keyPair = await mnemonicToPrivateKey(mnemonics);
  const workchain = 0; 
  const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });

  logWalletDetails('Ton', {
    Mnemonics: mnemonics.join(' '),
    'Secret Key': Buffer.from(keyPair.secretKey).toString('hex'),
    'Public Key': Buffer.from(keyPair.publicKey).toString('hex'),
    Wallet: wallet.address.toString()
  });
};

export const generateSolanaWallet = () => {
  const keypair = SolanaKeypair.generate();
  const publicKey = keypair.publicKey.toString();
  const secretKey = bs58.encode(keypair.secretKey);

  logWalletDetails('Solana', {
    'Public Key': publicKey,
    'Secret Key': secretKey
  });
};

export const generateEthereumWallet = () => {
  const mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hdKey = HDKey.fromMasterSeed(seed);
  const child = hdKey.derive("m/44'/60'/0'/0/0");
  const privateKey = Buffer.from(child.privateKey!).toString('hex');
  const account = privateKeyToAccount(`0x${privateKey}`)
  logWalletDetails('Ethereum', {
    Address: account.address,
    Mnemonic: mnemonic,
    'Private Key': privateKey
  });
};

export const generateLitecoinWallet = () => {
  const mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hdKey = HDKey.fromMasterSeed(seed);
  const child = hdKey.derive("m/44'/2'/0'/0/0");
  const publicKey = child.publicKey;
  const { address } = bitcoin.payments.p2pkh({ pubkey: Buffer.from(publicKey!.buffer) });

  logWalletDetails('Litecoin', {
    Address: address,
    Mnemonic: mnemonic,
    Seed: Buffer.from(child.privateKey!.buffer).toString('hex') || 'No private key available'
  });
};


export const generateRippleWallet = () => {
  const wallet = xrpl.Wallet.generate();

  logWalletDetails('Ripple', {
    Address: wallet.address,
    Secret: wallet.privateKey
  });
};

export const generateWallets = async () => {
  generateBitcoinWallet();
  generateEthereumWallet();
  generateSolanaWallet();
  await generatePolkadotWallet();
  await generateTonWallet();
  generateLitecoinWallet();
  generateRippleWallet();
};
