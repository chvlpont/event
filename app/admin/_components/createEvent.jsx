  import React from 'react';

  function CreateEvent() {
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission here
    };


    return (
      
      
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-blue-700 dark:bg-gray-200 p-8 rounded-lg shadow-lg">
          <label className="block mb-4">
            <span className="text-blue-400 dark:text-blue-800">Title:</span>
            <input type="text" className="form-input mt-1 block w-full rounded-md bg-input text-white border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50" />
          </label>
          <label className="block mb-4">
            <span className="text-blue-400 dark:text-blue-800">Location:</span>
            <input type="text" className="form-input mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50" />
          </label>
          <label className="block mb-4">
            <span className="text-blue-400 dark:text-blue-800">Category:</span>
            <select className="form-select mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50">
              <option value="">Select a category</option>
              <option>Conference</option>
              <option>Meetup</option>
              <option>Workshop</option>
              <option>Seminar</option>
              <option>Party</option>
            </select>
          </label>
          <label className="block mb-4">
            <span className="text-blue-400 dark:text-blue-800">Date & Time:</span>
            <input type="datetime-local" className="form-input mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50" />
          </label>
          <label className="block mb-4">
            <span className="text-blue-400 dark:text-blue-800">Description:</span>
            <textarea className="form-textarea mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50" rows="3"></textarea>
          </label>
          <label className="block mb-4">
            <span className="text-blue-400 dark:text-blue-800">Number of Seats:</span>
            <input type="number" min="1" className="form-input mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50" />
          </label>
          <label className="block mb-4">
  <span className="text-blue-400 dark:text-blue-800">Upload Images:</span>
  <input type="file" className="form-input mt-1 block w-full bg-input text-white border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50 p-2 rounded" multiple />
</label>
          <button type="submit" className="w-full py-3 px-4 bg-blue-400 text-white dark:bg-blue-600 dark:text-gray-200 rounded hover:bg-blue-500 dark:hover:bg-blue-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out">
  Create Event
</button>
        </form>
     
    );
  }



  export default CreateEvent;