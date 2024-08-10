'use client';

import { useEffect, useState } from 'react';
import { fetchProfile } from '@/api/graphql';
import { useUser, useUserActions } from '@/store/user.store';
import ProfileCard from '@/app/profile/components/profile-card';
import EvmForm from '../evm-form';
import Blockchains from '../components/blockchains';

const UserProfileRoute = ({ params }: { params: { profile_id: string } }) => {
  const profile_id = params.profile_id;
  const { setUser } = useUserActions();
  const { name } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchProfile(profile_id);
      if (fetchedData) {
        setUser(fetchedData);
      }
      setLoading(false);
    };

    getData();
  }, [profile_id, setUser]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!name) {
    return <div>No user found with that ID.</div>;
  }

  return (
    <div className="grid gap-10 w-full lg:w-1/2 md:w-3/4 sm:w-9/10">
      <ProfileCard />
      <EvmForm />
      <Blockchains />
    </div>
  );
};

export default UserProfileRoute;
