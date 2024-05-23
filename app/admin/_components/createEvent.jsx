'use client'
import React, { useState, useRef } from 'react';
import { createEvent } from '../../../utils/eventservices'; // Import createEvent function
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: '',
    date: '',
    description: '',
    numberOfSeats: '',
    imageFile: null
  });
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      imageFile: file
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, location, category, date, description, numberOfSeats, imageFile } = formData;
      const eventId = await createEvent(title, date, description, imageFile, category, location, numberOfSeats);
      console.log('Event created successfully! Event ID:', eventId);
      toast.success('Event created successfully!'); // Show success toast
      setFormData({
        title: '',
        location: '',
        category: '',
        date: '',
        description: '',
        numberOfSeats: '',
        imageFile: null
      });
      fileInputRef.current.value = ''; // Reset the file input field
    } catch (error) {
      console.error('Failed to create event:', error);
      toast.error('Failed to create event.'); // Show error toast
    }
  };

  return (
    <>
    <ToastContainer position="top-center" />
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-blue-700 dark:bg-gray-200 p-8 rounded-lg shadow-lg">
      <label className="block mb-4">
        <span className="text-blue-400 dark:text-blue-800">Title:</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input mt-1 block w-full rounded-md bg-input text-white border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50"
        />
      </label>
      <label className="block mb-4">
        <span className="text-blue-400 dark:text-blue-800">Location:</span>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="form-input mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50"
        />
      </label>
      <label className="block mb-4">
        <span className="text-blue-400 dark:text-blue-800">Category:</span>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-select mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50"
        >
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
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-input mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50"
        />
      </label>
      <label className="block mb-4">
        <span className="text-blue-400 dark:text-blue-800">Description:</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-textarea mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50"
          rows="3"
        ></textarea>
      </label>
      <label className="block mb-4">
        <span className="text-blue-400 dark:text-blue-800">Number of Seats:</span>
        <input
          type="number"
          name="numberOfSeats"
          min="1"
          value={formData.numberOfSeats}
          onChange={handleChange}
          className="form-input mt-1 block w-full rounded-md bg-input border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50"
        />
      </label>
      <label className="block mb-4">
        <span className="text-blue-400 dark:text-blue-800">Upload Images:</span>
      <input
  type="file"
  onChange={handleImageChange}
  ref={fileInputRef}
          className="form-input mt-1 block w-full bg-input text-white border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50 p-2 rounded"
          multiple
        />
      </label>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-400 text-white dark:bg-blue-600 dark:text-gray-200 rounded hover:bg-blue-500 dark:hover:bg-blue-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out"
      >
        Create Event
      </button>
    </form>
    </>
  );
}

export default CreateEvent;
