import React from 'react';

function CreateEvent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-5">Create Event</h1>
          <form className="w-full max-w-sm bg-white p-5 rounded shadow">
            <label className="block mb-2">
              <span className="text-gray-700">Title:</span>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Location:</span>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Date & Time:</span>
              <input type="datetime-local" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Number of Seats:</span>
              <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </label>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Create Event</button>
          </form>
        </div>
      );
    }

export default CreateEvent;