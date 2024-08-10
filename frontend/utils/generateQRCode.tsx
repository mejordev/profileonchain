import QRCode from 'qrcode';

export const generateQRCode = async (text: string): Promise<string> => {
  try {
    const dataUrl = await QRCode.toDataURL(text);
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate QR code:', err);
    throw err;
  }
};
