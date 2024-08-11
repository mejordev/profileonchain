import {
  EAS_CONTRACT_ADDRESS,
  SCHEMA_UID,
  schemaEncoder,
} from '@/constants/global';
import { EAS } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';
const eas = new EAS(EAS_CONTRACT_ADDRESS);

// Setup Ethereum provider and signer

const provider = ethers.getDefaultProvider('https://sepolia.base.org');
// const provider = ethers.getDefaultProvider(
//   'https://virtual.base-sepolia.rpc.tenderly.co/9d9813ae-2960-4d92-9e4d-19df3a05e04a',
// );

const privateKey = process.env.PRIVATE_KEY2;
const signer = new ethers.Wallet(privateKey!, provider);
eas.connect(signer);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const encodedData = req.body.message.data;

      console.log('Data', req.body);

      // Uncomment and implement validation if needed
      // const decodedData = schemaEncoder.decodeData(encodedData);
      // const validationError = validateRequestBody(decodedData);
      // if (validationError) {
      //   return res.status(400).json({ message: validationError });
      // }
      const recipient = req.body.message.recipient;
      const offchain = await eas.getOffchain();

      const isValidAttestation = offchain.verifyOffchainAttestationSignature(
        recipient,
        req.body,
      );
      if (isValidAttestation) {
        const tx = await eas.attest({
          schema: SCHEMA_UID,
          data: {
            recipient: recipient,
            expirationTime: BigInt(0),
            revocable: true,
            data: encodedData,
          },
        });

        const newAttestationUID = await tx.wait();

        res.status(200).json({ newAttestationUID });
      } else {
        res.status(500).json({ message: 'Not valid Attestation' });
      }
    } catch (error: any) {
      console.error('Error: ', error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
