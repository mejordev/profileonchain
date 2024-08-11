'use client';
import ProfileCardMock from './profile/components/profile-card-mock';
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <>
      {' '}
      <div className="grid gap-10 w-full lg:w-1/2 md:w-3/4 sm:w-9/10">
        {/* <ProfileCardMock></ProfileCardMock> */}
        <div className="flex flex-col items-center text-center p-4">
          <CardHeader className="pt-14 w-full">
            <CardTitle className="text-xl font-bold">
              Create Your Donation Profile Now!
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-md md:px-16">
            Set up your ProfileOnChain donation account in just a few clicks and
            start receiving crypto donations directly to your wallets.
          </CardDescription>

          <CardContent className="w-full p-10">
            <Button className="w-full" onClick={() => router.push('/panel')}>
              Create profile
            </Button>
          </CardContent>
        </div>
      </div>
    </>
  );
}
