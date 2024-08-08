import express from 'express';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { SCHEMA, SCHEMA_UID } from './constants/global.js';

// Load environment variables
dotenv.config();

// Initialize Schema Encoder
const schemaEncoder = new SchemaEncoder(SCHEMA);

// Initialize EAS with contract address from environment
const EASContractAddress = process.env.EAS_CONTRACT_ADDRESS;
const eas = new EAS(EASContractAddress);

// Setup Ethereum provider and signer
const provider = ethers.getDefaultProvider('https://sepolia.base.org');
const privateKey = process.env.PRIVATE_KEY2;
const signer = new ethers.Wallet(privateKey, provider);
eas.connect(signer);

// Initialize Express application
const app = express();
app.use(express.json()); // Middleware for JSON parsing

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Utility function to validate request body
const validateRequestBody = body => {
  const { name, bitcoin, ethereum, solana, polkadot, ton, litecoin, ripple } =
    body;
  if (!name) return 'Name is required';

  const requiredAddress = {
    bitcoin,
    ethereum,
    solana,
    polkadot,
    ton,
    litecoin,
    ripple,
  };
  for (const [blockchain, value] of Object.entries(requiredAddress)) {
    if (!value || value.trim() === '') {
      return `${blockchain} address is required`;
    }
  }
  return null;
};

// Utility function to encode data
const encodeData = body => {
  const {
    name,
    description,
    avatarUrl,
    website,
    bitcoin,
    ethereum,
    solana,
    polkadot,
    ton,
    litecoin,
    ripple,
  } = body;
  return schemaEncoder.encodeData([
    { name: 'name', value: name, type: 'string' },
    { name: 'description', value: description || '', type: 'string' },
    { name: 'avatarUrl', value: avatarUrl || '', type: 'string' },
    { name: 'website', value: website || '', type: 'string' },
    { name: 'bitcoin', value: bitcoin, type: 'string' },
    { name: 'ethereum', value: ethereum, type: 'address' },
    { name: 'solana', value: solana, type: 'string' },
    { name: 'polkadot', value: polkadot, type: 'string' },
    { name: 'ton', value: ton, type: 'string' },
    { name: 'litecoin', value: litecoin, type: 'string' },
    { name: 'ripple', value: ripple, type: 'string' },
  ]);
};
function toJSON(data) {
  const replacer = (key, value) =>
    typeof value === 'bigint' ? value.toString() : value;
  return JSON.stringify(data, replacer, 2);
}

// Handler for creating offchain attestation
app.post('/create', async (req, res) => {
  try {
    const validationError = validateRequestBody(req.body);
    if (validationError)
      return res.status(400).json({ message: validationError });

    const offchain = await eas.getOffchain();
    const encodedData = encodeData(req.body);

    const attestation = await offchain.signOffchainAttestation(
      {
        recipient: '0xa42428D1bf904d762adD02b27ADac26d53643782',
        expirationTime: 0,
        time: BigInt(Math.floor(Date.now() / 1000)),
        revocable: true,
        schema: SCHEMA_UID,
        refUID:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        data: encodedData,
      },
      signer,
    );

    console.log(attestation);
    const rawData = toJSON(attestation);
    console.log(rawData);

    const isValidAttestation = offchain.verifyOffchainAttestationSignature(
      signer.address,
      JSON.parse(rawData),
    );
    res.status(200).json({ isValidAttestation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Handler for creating on-chain attestation
app.post('/createChain', async (req, res) => {
  try {
    const validationError = validateRequestBody(req.body);
    if (validationError)
      return res.status(400).json({ message: validationError });

    const encodedData = encodeData(req.body);

    const tx = await eas.attest({
      schema: SCHEMA_UID,
      data: {
        recipient: '0x0000000000000000000000000000000000000000',
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    });
    const newAttestationUID = await tx.wait();
    console.log('New attestation UID:', newAttestationUID);

    res.status(200).json({ newAttestationUID });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/save', async (req, res) => {
  try {
    const validationError = validateRequestBody(req.body);
    if (validationError)
      return res.status(400).json({ message: validationError });

    const offchain = await eas.getOffchain();
    const encodedData = encodeData(req.body);

    const attestation = await offchain.signOffchainAttestation(
      {
        recipient: '0xa42428D1bf904d762adD02b27ADac26d53643782',
        expirationTime: 0,
        time: BigInt(Math.floor(Date.now() / 1000)),
        revocable: true,
        schema: SCHEMA_UID,
        refUID:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        data: encodedData,
      },
      signer,
    );

    console.log(attestation);
    const rawData = toJSON(attestation);
    console.log(rawData);

    const isValidAttestation = offchain.verifyOffchainAttestationSignature(
      signer.address,
      JSON.parse(rawData),
    );
    res.status(200).json({ isValidAttestation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
