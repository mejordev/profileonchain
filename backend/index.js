import express from 'express';
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const EASContractAddress = process.env.EAS_CONTRACT_ADDRESS; // Sepolia v0.26

// Initialize the EAS SDK with the contract address
const eas = new EAS(EASContractAddress);

// Get a default provider (in production use something like infura/alchemy)
const provider = ethers.getDefaultProvider('sepolia');

const privateKey = process.env.PRIVATE_KEY; // replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Connect the wallet to the EAS SDK
eas.connect(wallet);

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Test API endpoint
app.get('/test', (req, res) => {
  try {
    res.status(200).json({ message: 'API is working' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to get attestation
app.get('/test2', async (req, res) => {
  try {
    const uid = '0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e';
    const attestation = await eas.getAttestation(uid);
    console.log(attestation);
    res.status(200).json({ message: attestation[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to sign and verify offchain attestation
app.get('/test3', async (req, res) => {
  try {
    const offchain = await eas.getOffchain();
    const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
    const encodedData = schemaEncoder.encodeData([
      { name: "eventId", value: 1, type: "uint256" },
      { name: "voteIndex", value: 1, type: "uint8" },
    ]);

    const signer = new ethers.Wallet(privateKey, provider);

    const attestation = await offchain.signOffchainAttestation({
      recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
      expirationTime: 0,
      time: 1671219636,
      revocable: true,
      version: 1,
      nonce: 0,
      schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
      refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
      data: encodedData,
    }, signer);

    const EAS_CONFIG = {
      address: attestation.domain.verifyingContract,
      version: attestation.domain.version,
      chainId: attestation.domain.chainId,
    };

    const isValidAttestation = offchain.verifyOffchainAttestationSignature(
      signer.address,
      attestation
    );

    res.status(200).json({ isValidAttestation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
