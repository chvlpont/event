import React, { useState } from 'react';
import { IoEllipsisVerticalOutline } from "react-icons/io5";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function UserList() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Albert Einstein', email: 'einstein@example.com', role: 'User', isAdmin: false, profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0khaUcbpblqXKUuxIpxyGB9VqRKmENQZWjbk8uXGEIg&s', created_at: new Date(), last_login: new Date() },
  { id: 2, name: 'Marie Curie', email: 'curie@example.com', role: 'Admin', isAdmin: true, profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0khaUcbpblqXKUuxIpxyGB9VqRKmENQZWjbk8uXGEIg&s', created_at: new Date(), last_login: new Date() },
  { id: 3, name: 'Isaac Newton', email: 'newton@example.com', role: 'User', isAdmin: false, profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0khaUcbpblqXKUuxIpxyGB9VqRKmENQZWjbk8uXGEIg&s', created_at: new Date(), last_login: new Date() },
  { id: 4, name: 'Rosalind Franklin', email: 'franklin@example.com', role: 'Admin', isAdmin: true, profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0khaUcbpblqXKUuxIpxyGB9VqRKmENQZWjbk8uXGEIg&s', created_at: new Date(), last_login: new Date() },
  { id: 5, name: 'Nikola Tesla', email: 'tesla@example.com', role: 'User', isAdmin: false, profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0khaUcbpblqXKUuxIpxyGB9VqRKmENQZWjbk8uXGEIg&s', created_at: new Date(), last_login: new Date() },
    // Add more users as needed
  ]);

  const [showAdmins, setShowAdmins] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const filteredUsers = showAdmins ? users.filter(user => user.isAdmin) : users.filter(user => !user.isAdmin);

  return (
<div className="p-4">
    <div className="mb-4">
      <button 
        onClick={() => setShowAdmins(false)}
        className={`px-4 py-2 rounded-l ${!showAdmins ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
      >
        Regular
      </button>
      <button 
        onClick={() => setShowAdmins(true)}
        className={`px-4 py-2 rounded-r ${showAdmins ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
      >
        Admins
      </button>
    </div>
       <div className="bg-gray-800 rounded-md">
      <div className="grid p-2 text-white border-b border-gray-700" style={{gridTemplateColumns: '1fr 1fr 1fr 1fr auto'}}>
      <p className='pl-24 text-blue-500 font-semibold'>User</p>
<p className='text-blue-500 font-semibold pl-2'>Role</p>
<p className="text-left pl-5 text-blue-500 font-semibold">Created At</p>
<p className="text-left pl-7 text-blue-500 font-semibold">Last Login</p>
<p className='text-blue-500 font-semibold'>Actions</p>
      </div>
      {filteredUsers.map((user, index) => (
  <div key={user.id} className={`grid p-2 items-center text-white ${index < filteredUsers.length - 1 ? 'border-b border-gray-700' : ''}`} style={{gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gridGap: '1rem'}}>
    <div className="flex items-center space-x-4">
      <img src={user.profilePic} alt={user.name} className="w-10 h-10 rounded-full" />
      <div>
        <p className="font-bold text-lg pl-4">{user.name}</p>
        <p className="pl-4">{user.email}</p>
      </div>
    </div>
    <p>{user.role}</p>
    <p>{new Date(user.created_at).toLocaleDateString()}</p> 
    <p>{new Date(user.last_login).toLocaleDateString()}</p> 
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IoEllipsisVerticalOutline />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 rounded p-2 shadow-2xl mr-4 border border-gray-300">
  {user.isAdmin ? (
    <DropdownMenuItem className="cursor-pointer focus:bg-gray-700 focus:text-white text-white" onSelect={() => handleDemote(user.id)}>Demote</DropdownMenuItem>
  ) : (
    <DropdownMenuItem className="cursor-pointer focus:bg-gray-700 focus:text-white text-white" onSelect={() => handlePromote(user.id)}>Promote</DropdownMenuItem>
  )}
  <DropdownMenuItem className="cursor-pointer focus:bg-gray-700 focus:text-white text-white" onSelect={() => handleDelete(user.id)}>Delete</DropdownMenuItem>
</DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
))}
    </div>
  </div>
);
}


export default UserList;