'use client';
import { handleSubmit } from '@/api/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateWallets } from '@/utils/wallets';

const Component = () => {
  return (
    <div className="grid gap-10 w-full lg:w-1/2 md:w-3/4 sm:w-9/10">
      <ProfileCard />
      <WalletCard />
    </div>
  );
};

const ProfileCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a profile</CardTitle>
        <CardDescription>
          The directory within your project, in which your plugins are located.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <InputField id="name" label="Name" placeholder="Enter your name" />
          <TextareaField
            id="description"
            label="Description"
            placeholder="Enter your description"
          />
          <InputField
            id="avatarUrl"
            label="Avatar URL"
            placeholder="Enter your avatar URL"
          />
          <InputField
            id="website"
            label="Website"
            placeholder="Enter your website"
          />
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button className="w-full" onClick={() => handleSubmit('/create')}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

const WalletCard = () => {
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
            id="bitcoin"
            label="Bitcoin Wallet Address"
            placeholder="Enter your Bitcoin wallet address"
          />
          <InputField
            id="ethereum"
            label="Ethereum Wallet Address"
            placeholder="Enter your Ethereum wallet address"
          />
          <InputField
            id="solana"
            label="Solana Wallet Address"
            placeholder="Enter your Solana wallet address"
          />
          <InputField
            id="polkadot"
            label="Polkadot Wallet Address"
            placeholder="Enter your Polkadot wallet address"
          />
          <InputField
            id="ton"
            label="Ton Wallet Address"
            placeholder="Enter your Ton wallet address"
          />
          <InputField
            id="litecoin"
            label="Litecoin Wallet Address"
            placeholder="Enter your Litecoin wallet address"
          />
          <InputField
            id="ripple"
            label="Ripple Wallet Address"
            placeholder="Enter your Ripple wallet address"
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="allowChanges" defaultChecked />
            <label
              htmlFor="allowChanges"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Allow administrators to change the directory.
            </label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={generateWallets}>Generate</Button>
      </CardFooter>
    </Card>
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, placeholder }) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type="text" className="w-full" placeholder={placeholder} />
    </div>
  );
};

interface TextareaFieldProps {
  id: string;
  label: string;
  placeholder: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  placeholder,
}) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} placeholder={placeholder} className="min-h-22" />
    </div>
  );
};

export default Component;
