import React from 'react';
import { useUserStore } from '@/store/user.store';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import CryptoQRCode from '@/app/profile/components/qrcode';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { shortenAddrLenght } from '@/lib/utils';

const Blockchains = () => {
  const { toast } = useToast();

  const { bitcoin, ethereum, solana, polkadot, ton, litecoin, ripple } =
    useUserStore();
  const data = { bitcoin, ethereum, solana, polkadot, ton, litecoin, ripple };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: 'Address copied',
      description: 'Address copied to clipboard!',
    });
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(data).map(([key, value]) => (
        <Card key={key}>
          <CardHeader className="flex justify-center">
            <CardTitle className="text-center">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center h-40">
              <CryptoQRCode
                chain={key}
                address={value!}
                amount={1}
                label={`${key.charAt(0).toUpperCase() + key.slice(1)} Donation`}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <CardDescription className="text-center mb-4 break-words">
              {shortenAddrLenght(value!, 10)}
            </CardDescription>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleCopy(value!)}
            >
              Copy Address
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Blockchains;
