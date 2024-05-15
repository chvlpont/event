import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';


function AdminNavbar() {
    const { user } = useUser();

  return (
<div className="w-full bg-gray-800 text-white flex items-center justify-between p-6 min-h-[4.8rem]">
    <div></div> {/* This empty div is to push the user info to the right */}
    <div className="flex items-center">
      {user && (
        <UserButton />
      )}
    </div>
  </div>
);
}
export default AdminNavbar;