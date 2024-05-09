import React from 'react';

const Event = ({ events = [] }) => { 
    return (
        <div className="p-5">
          <h1 className="text-3xl font-bold mb-5">Event Page</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5">Create Event</button>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5" type="text" placeholder="Search events..." />
          {events.length > 0 ? (
            events.map(event => (   
              <div key={event.id} className="mb-4 p-4 border rounded shadow">
                <h2 className="text-xl font-bold">{event.name}</h2>
                <p className="text-gray-700">{event.description}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2">Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">Delete</button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No events to display</p>
          )}
        </div>
      );
    };

export default Event;