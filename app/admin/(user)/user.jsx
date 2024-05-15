import React from 'react';
import UserList from '../_components/userList';

function UserPage() {
  return (
    <div>
    <h2 className='text-4xl text-center'>Users</h2>
    <p className='text-center'>Welcome to the users page!</p>
      <UserList />
    </div>
  );
}

export default UserPage;