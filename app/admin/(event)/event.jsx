'use client'
import React, { useState } from 'react';
import EventList from '../_components/eventList';



const Event = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
    return (
      <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">Event Page</h2>
      <button className="py-3 px-4 mb-4 bg-blue-400 text-white dark:bg-blue-600 dark:text-gray-200 rounded hover:bg-blue-500 dark:hover:bg-blue-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out mt-2 mr-2">
        Create Event
      </button>
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-input leading-tight focus:outline-none focus:shadow-outline mb-5" 
        type="text" 
        placeholder="Search events..." 
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <EventList />
    </div>
  );
};

export default Event;