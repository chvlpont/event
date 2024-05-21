  'use client'
  import React from 'react';

  function CreateEvent() {
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission here
    };


    return (
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
        <label className="block mb-4">
          <span className="text-gray-200">Title:</span>
          <input type="text" className="form-input mt-1 block w-full rounded-md bg-gray-700 text-gray-200 border-gray-600 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50" />
        </label>
        <label className="block mb-4">
          <span className="text-gray-200">Location:</span>
          <input type="text" className="form-input mt-1 block w-full rounded-md bg-gray-700 text-gray-200 border-gray-600 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50" />
        </label>
        <label className="block mb-4">
          <span className="text-gray-200">Category:</span>
          <select className="form-select mt-1 block w-full rounded-md bg-gray-700 text-gray-200 border-gray-600 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50">
            <option value="">Select a category</option>
            <option>Music Festival</option>
            <option>Art Exhibition</option>
            <option>Workshop</option>
            <option>Tech Conference</option>
            <option>Party</option>
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-200">Date & Time:</span>
          <input type="datetime-local" className="form-input mt-1 block w-full rounded-md bg-gray-700 text-gray-200 border-gray-600 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50" />
        </label>
        <label className="block mb-4">
          <span className="text-gray-200">Description:</span>
          <textarea className="form-textarea mt-1 block w-full rounded-md bg-gray-700 text-gray-200 border-gray-600 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50" rows="3"></textarea>
        </label>
        <label className="block mb-4">
          <span className="text-gray-200">Number of Seats:</span>
          <input type="number" min="1" className="form-input mt-1 block w-full rounded-md bg-gray-700 text-gray-200 border-gray-600 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50" />
        </label>
        <label className="block mb-4">
          <span className="text-gray-200">Upload Images:</span>
          <input type="file" className="form-input mt-1 block w-full bg-gray-700 text-gray-200 border-gray-600 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-400 focus:ring-opacity-50 p-2 rounded" multiple />
        </label>
        <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-gray-200 rounded hover:bg-blue-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out">
          Create Event
        </button>
      </form>
    );
  }



  export default CreateEvent;