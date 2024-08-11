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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { WalletDialog } from './wallet-dialog';

const WalletCard = () => {
  const { bitcoin, ethereum, solana, polkadot, ton, litecoin, ripple } =
    useUserStore();

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Generated Wallets</CardTitle>
        <CardDescription className="pt-4">
          Wallets for this profile have been generated. Now, you must click the
          Show Keys button and save them in a secure place. Without this, you
          will lose access to your funds. Do not share your mnemonic or private
          keys with anyone.
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
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
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
