'use client';
import { ProfileCard } from './components/profile-card';

const Profile = () => {
  return (
    <div className="grid gap-10 w-full lg:w-1/2 md:w-3/4 sm:w-9/10">
      <ProfileCard></ProfileCard>
    </div>
  );
};

export default Profile;
