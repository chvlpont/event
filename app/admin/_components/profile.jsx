import React from 'react';
import { UserProfile } from '@clerk/nextjs';

function Profile() {
  return (
    <div className="profile-container">
      <UserProfile />
    </div>
  );
};


export default Profile;