import { generateQRCode } from '@/utils/generateQRCode';
import React, { useEffect, useState } from 'react';

interface CryptoQRCodeProps {
  chain: string;
  address: string;
  amount?: number;
  label?: string;
}

const CryptoQRCode: React.FC<CryptoQRCodeProps> = ({
  chain,
  address,
  amount,
  label,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    const generateQr = async () => {
      const cryptoUri = `${chain}:${address}?value=${
        amount || ''
      }&chain_id=8453`;
      const url = await generateQRCode(cryptoUri);
      setQrCodeUrl(url);
    };

    generateQr();
  }, [address, amount, label]);

  return (
    <div>
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="Crypto QR Code" />
      ) : (
        <p>Generating QR code...</p>
      )}
    </div>
  );
};

export default CryptoQRCode;
