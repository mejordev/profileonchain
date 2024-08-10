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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { WalletDialog } from './wallet-dialog';
import { useWallets, useWalletsActions } from '@/store/wallets.store';
import { createEasOffchain } from '@/api/eas';
import { mockData } from '@/api/api';

const WalletCard = () => {
  const { bitcoin, ethereum, solana, polkadot, ton, litecoin, ripple } =
    useUserStore();
  const { isCopied, ethereumPrivKey } = useWallets();
  const { setCopied, reset } = useWalletsActions();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate wallets</CardTitle>
        <CardDescription>
          The directory within your project, in which your plugins are located.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <InputField
            id="ethereum"
            label="Ethereum Wallet Address"
            value={ethereum}
          />
          <InputField
            id="bitcoin"
            label="Bitcoin Wallet Address"
            value={bitcoin}
          />
          <InputField
            id="solana"
            label="Solana Wallet Address"
            value={solana}
          />
          <InputField
            id="polkadot"
            label="Polkadot Wallet Address"
            value={polkadot}
          />
          <InputField id="ton" label="Ton Wallet Address" value={ton} />
          <InputField
            id="litecoin"
            label="Litecoin Wallet Address"
            value={litecoin}
          />
          <InputField
            id="ripple"
            label="Ripple Wallet Address"
            value={ripple}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="savedKeys"
              checked={isCopied}
              onClick={event => {
                setCopied(!isCopied);
              }}
            />

            <label
              htmlFor="savedKeys"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Save keys if not you will last funds on your wallets.
            </label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        {isCopied && (
          <Button
            onClick={async () => {
              await createEasOffchain(mockData, ethereumPrivKey);
            }}
          >
            Generate
          </Button>
          // <Button
          //   className="w-full"
          //   onClick={() => {
          //     console.log('/save');
          //     reset();
          //   }}
          // >
          //   Show profile {isCopied}
          // </Button>
        )}

        <WalletDialog></WalletDialog>
      </CardFooter>
    </Card>
  );
};

export default WalletCard;

interface InputFieldProps {
  id: string;
  label: string;
  value: string | undefined;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value }) => (
  <div className="grid gap-3">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type="text" className="w-full" value={value} readOnly />
  </div>
);
