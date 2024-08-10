import React from 'react';
import { useUser } from '@/store/user.store'; // Ensure this path is correct
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'; // Replace with your actual UI components
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CryptoQRCode from './qrcode';

export const ProfileCard = () => {
  const {
    name = 'superhack2024',
    description = 'Good morning, thank you very much for your support! The "coffees" you gifted me are the fuel that allows me to continue my work, often in the middle of the night :).',
    avatarUrl = 'https://ethglobal.b-cdn.net/events/superhack2024/square-logo/default.png',
  } = useUser();

  return (
    <Card className="flex flex-col items-center text-center p-4">
      <div className="relative w-full flex justify-center">
        <Avatar className="w-32 h-32 absolute -top-20">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </div>
      <CardHeader className="pt-14 w-full">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardDescription className="text-md md:px-16">
        {description}
      </CardDescription>
      <CardContent className="w-full"></CardContent>
      <CardFooter className="border-t w-full px-6 py-4">
        <div>
          <h1>Crypto Transaction QR Code</h1>
          <CryptoQRCode
            chain="ethereum"
            address="0x1f09Bd56Df49c4B51297FBFDEb506E1bA8F0bdfC"
            amount={1}
            label="Donation"
          />
        </div>
        <Button className="w-full">Send donation</Button>
        <div>
          <h1>Crypto Transaction QR Code</h1>
          <CryptoQRCode
            chain="ethereum"
            address="0x1f09Bd56Df49c4B51297FBFDEb506E1bA8F0bdfC"
            amount={1}
            label="Donation"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
