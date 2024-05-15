'use client'
import React, { useState } from 'react';
import EventList from '../_components/eventList';
import { FaSearch } from 'react-icons/fa';



const Event = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
    return (
      <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">Event Page</h2>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-5">
        <button className="py-3 px-4 bg-blue-400 text-white dark:bg-blue-600 dark:text-gray-200 rounded hover:bg-blue-500 dark:hover:bg-blue-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out mb-4 lg:mb-0">
          Create Event
        </button>
        <div className="relative w-full lg:w-10/12 xl:w-8/12">
        <input 
  className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground bg-input leading-tight focus:outline-none focus:shadow-outline" 
  type="text" 
  placeholder="Search events..." 
  value={searchTerm}
  onChange={handleSearchChange}
/>
          <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <EventList />
    </div>
  );
};

export default Event;