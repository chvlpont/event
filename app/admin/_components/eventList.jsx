
'use client';
import React from 'react';
import Link from 'next/link';

export const events = [
  {
    id: 1,
    category: 'Music',
    title: 'Music Festival',
    date: '2024-06-01',
    location: 'Central Park, New York',
    description: 'Join us for a day of amazing music and fun!',
    registrants: 4500,
    limit: 5000,
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    category: 'Art',
    title: 'Art Exhibition',
    date: '2024-07-30',
    location: 'Modern Art Museum, San Francisco',
    description: 'Experience the best of contemporary art at our annual exhibition.',
    registrants: 200,
    limit: 200,
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    category: 'Tech',
    title: 'Tech Conference',
    date: '2024-08-03',
    location: 'Convention Center, Austin',
    description: 'The biggest tech conference of the year. Don\'t miss it!',
    registrants: 800,
    limit: 1000,
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  // Add more events...
];

function EventList({ searchTerm }) {
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes((searchTerm || '').toLowerCase())
  );
  return (
    <div className="divide-y divide-gray-700">
      <div className="bg-gray-800 p-4 rounded-t-lg shadow-lg grid grid-cols-7 items-center font-bold">
        <p className="col-span-1"></p>
        <p className="text-blue-500 font-semibold text-center ">Title</p>
        <p className="text-blue-500 font-semibold text-center">Date</p>
        <p className="text-blue-500 font-semibold text-center">Location</p>
        <p className="text-blue-500 font-semibold text-center ">Category</p>
        <p className="text-blue-500 font-semibold text-center">Registrants</p>
        <p className="text-blue-500 font-semibold text-center">Actions</p>
      </div>
      {filteredEvents.length > 0 ? filteredEvents.map((event, index) => (
        <div key={event.id} className={`bg-gray-800 p-4 shadow-lg grid grid-cols-7 gap-4 items-center ${index === filteredEvents.length - 1 ? 'rounded-b-lg' : ''}`}>
          <div className="flex justify-center items-center col-span-1">
            <img src={event.image} alt="Event" className="w-16 h-16 rounded-full shadow"/>
          </div>
          <h2 className="text-lg font-semibold col-span-1 text-center text-white">{event.title}</h2>
          <p className="col-span-1 text-center text-white">{event.date}</p>
          <p className="col-span-1 text-center text-white">{event.location}</p>
          <p className="line-clamp-2 col-span-1 text-center text-white">{event.category}</p>
          <div className="flex items-center justify-center col-span-1 text-white">
            <span>{event.registrants}/{event.limit}</span>
            {event.registrants >= event.limit && <span className="ml-2 text-red-500">(Full)</span>}
          </div>
          <Link href={`/admin/event/${event.id}`} passHref>
            <button
              className="w-full py-3 px-4 bg-blue-600 text-gray-200 rounded hover:bg-blue-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out col-span-1"
            >
              Edit
            </button>
          </Link>
        </div>
      )) : (
        <div className="text-center py-10">
          <p>No events found that match your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default EventList;
