'use client';
import React, { useState, useEffect } from 'react';
import { deleteEvent, getEventById, updateEvent } from '@/utils/eventservices';
import { useRouter } from "next/navigation"
import Modal from 'react-modal';

function EventDetailPage({ params }) {

  const router = useRouter()
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    category: '',
    date: '',
    description: '',
    numberOfSeats: '',
    imageFile: null
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await getEventById(params.id);
        setEvent(eventData);
        setFormData({
          title: eventData.title,
          location: eventData.location,
          category: eventData.category,
          date: eventData.date,
          description: eventData.description,
          numberOfSeats: eventData.numberOfSeats,
          imageFile: null
        });
        setPreviewImage(eventData.imageUrl);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
      }
    }

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8  flex flex-col justify-center items-center ">
        <div>Loading...</div>
      </div>
    );
  }

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
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { imageFile, ...updatedData } = formData;
    try {
      await updateEvent(params.id, updatedData, imageFile);
      router.back()
      console.log('Event Updated! Event ID:', params.id);

    } catch (error) {
      console.error('Failed to update event:', error);
      // Handle error, maybe display an error message to the user
    }
  };
  const handleDelete = async () => {
    try {
      if (typeof eventToDelete === 'string') {
        await deleteEvent(eventToDelete);
        console.log('Event Deleted! Event ID:', eventToDelete);
        router.push('/admin/event/edit'); // navigate to the all events page
      } else {
        console.error('eventToDelete is not a string:', eventToDelete);
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
      // Handle error, maybe display an error message to the user
    }
    closeModal();
  };

  const openModal = (id) => {
    setEventToDelete(id);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setEventToDelete(null);
    setModalIsOpen(false);
  };

  return (

    <div className="container mx-auto px-4 py-8  flex flex-col justify-center items-center ">
      {event ? (
      <>
      <h2 className="text-4xl font-bold text-center mb-6 ">Edit Event</h2>
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
            className="form-input mt-1 block w-full bg-input text-white border-gray-600 dark:border-gray-400 shadow-sm focus:border-blue-400 dark:focus:border-blue-800 focus:ring focus:ring-blue-400 dark:focus:ring-blue-800 focus:ring-opacity-50 p-2 rounded"
            multiple
          />
        </label>
        <img src={previewImage || event?.imageUrl} alt="Event" className="w-16 h-16 rounded-full shadow"/>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-400 text-white dark:bg-blue-600 dark:text-gray-200 rounded hover:bg-blue-500 dark:hover:bg-blue-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out"
        >
          Update Event
        </button>
        <button
            type="button"
            onClick={() => openModal(event.id)}
            className="w-full py-3 px-4 g-red-600 text-white dark:bg-red-700 dark:text-gray-200 rounded hover:bg-red-500 dark:hover:bg-red-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out mt-4"
          >
            Delete Event
          </button>
        </form>
        <Modal
 isOpen={modalIsOpen}
 onRequestClose={closeModal}
 contentLabel="Delete Event Confirmation"
 style={{
   overlay: {
     backgroundColor: 'rgba(107, 114, 128, 0.75)' // This is the Tailwind color 'bg-gray-600' with 75% opacity
   },
   content: {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     transform: 'translate(-50%, -50%)',
     backgroundColor: '#1F2937', // This is the Tailwind color 'bg-gray-800'
     padding: '2rem', // This is the Tailwind size 'p-8'
     borderRadius: '0.5rem', // This is the Tailwind size 'rounded-lg'
     color: '#F3F4F6', // This is the Tailwind color 'text-gray-200'
   }
 }}
>
<div className="bg-gray-800 p-4 rounded flex flex-col items-center">
    <h2 className="mb-4">Are you sure you want to delete this event?</h2>
    <div>
      <button className="bg-red-500 text-white py-2 px-4 rounded mr-2" onClick={handleDelete}>Yes, delete it</button>
      <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={closeModal}>No, keep it</button>
    </div>
  </div>
</Modal>
      </>
    ) : (
      <div className="text-red-500">Event not found.</div>
    )}
    </div>
  )
}

export default EventDetailPage;