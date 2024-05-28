"use client";
import React, { useState, useEffect } from "react";
import { deleteEvent, getEventById, updateEvent } from "@/utils/eventservices";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import { FaUser } from 'react-icons/fa';

function EventDetailPage({ params }) {
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    date: "",
    description: "",
    numberOfSeats: "",
    imageFile: null,
  });
  const [bookedUsernames, setBookedUsernames] = useState([]);

  const newUsers = Array.from({length: 20}, (_, i) => ({id: i, name: `User ${i+1}`}));

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await getEventById(params.id);
        console.log("Event data:", eventData.bookedUsers);
        setEvent(eventData);
        setFormData({
          title: eventData.title,
          location: eventData.location,
          category: eventData.category,
          date: eventData.date,
          description: eventData.description,
          numberOfSeats: eventData.numberOfSeats,
          imageFile: null,
        });
        setPreviewImage(eventData.imageUrl);

        // Fetch all users and filter the booked users
        const response = await fetch("/api/allUserData");
        const data = await response.json();
        const allUsers = data.data;
        const bookedUserIds = eventData.bookedUsers;
        const bookedUsers = allUsers.filter((user) =>
          bookedUserIds.includes(user.id)
        );
        const bookedUsernames = bookedUsers.map((user) => user.username);

        setBookedUsernames(bookedUsernames);

        // Log the usernames of booked users
        console.log("Booked user usernames:", bookedUsernames);

        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    }

    fetchEvent();
  }, [params.id]);


  const handleBlur = () => {
    const bookedCount = bookedUsernames.length;
    if (formData.numberOfSeats < bookedCount) {
      setFormData({
        ...formData,
        numberOfSeats: bookedCount,
      });
    }
  };

  
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
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      imageFile: file,
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
      router.back();
      console.log("Event Updated! Event ID:", params.id);
    } catch (error) {
      console.error("Failed to update event:", error);
      // Handle error, maybe display an error message to the user
    }
  };
  const handleDelete = async () => {
    try {
      if (typeof eventToDelete === "string") {
        await deleteEvent(eventToDelete);
        console.log("Event Deleted! Event ID:", eventToDelete);
        router.push("/admin/event/edit"); // navigate to the all events page
      } else {
        console.error("eventToDelete is not a string:", eventToDelete);
      }
    } catch (error) {
      console.error("Failed to delete event:", error);
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
    <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
      {event ? (
        <>
          <h2 className="text-4xl font-bold text-center mb-6">Edit Event</h2>
          <div className="w-full max-w-6xl bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="flex">
              <form onSubmit={handleSubmit} className="w-3/4">
                <label className="block mb-4">
                  <span className="text-gray-300">Title:</span>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input mt-1 pl-2 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-300">Location:</span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input mt-1 pl-2 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-300">Category:</span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select mt-1 pl-2 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
                  <span className="text-gray-300">Date & Time:</span>
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input mt-1 pl-2 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-300">Description:</span>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea mt-1 pl-2 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    rows="3"
                  ></textarea>
                </label>
                <label className="block mb-4">
                  <span className="text-gray-300">Number of Seats:</span>
                  </label>
                <label className="block mb-4">
                  <span className="text-gray-300">Number of Seats:</span>
                  <input
                    type="number"
                    name="numberOfSeats"
                    min="1"
                    value={formData.numberOfSeats}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-input mt-1 pl-2 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-300">Upload Images:</span>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="form-input mt-1 pl-2 block w-full bg-gray-100 text-gray-900 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2 rounded"
                    multiple
                  />
                </label>
                <img
                  src={previewImage || event?.imageUrl}
                  alt="Event"
                  className="w-16 h-16 rounded-full shadow mb-4"
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none active:scale-95 transition duration-200 ease-in-out"
                >
                  Update Event
                </button>
                <button
                  type="button"
                  onClick={() => openModal(event.id)}
                  className="w-full py-3 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none active:scale-95 transition duration-200 ease-in-out mt-4"
                >
                  Delete Event
                </button>
              </form>
              <div className="w-1/4 pl-8">
                <h3 className="text-xl text-gray-300 font-bold mb-4">Booked Users:</h3>
                {bookedUsernames.length > 0 ? (
                  <ul className="list-none text-gray-100 bg-gray-700 p-4 rounded shadow max-h-96 overflow-y-auto">
                    {bookedUsernames.map((username, index) => (
                      <li key={index} className="flex items-center border-b border-slate-600/40 py-2">
                        <FaUser className="mr-2 text-gray-400" />
                        {username}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No users have booked this event yet.</p>
                )}
              </div>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Delete Event Confirmation"
            style={{
              overlay: {
                backgroundColor: "rgba(107, 114, 128, 0.75)", // This is the Tailwind color 'bg-gray-600' with 75% opacity
              },
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#1F2937", // This is the Tailwind color 'bg-gray-800'
                padding: "2rem", // This is the Tailwind size 'p-8'
                borderRadius: "0.5rem", // This is the Tailwind size 'rounded-lg'
                color: "#F3F4F6", // This is the Tailwind color 'text-gray-200'
              },
            }}
          >
            <div className="bg-gray-800 p-4 rounded flex flex-col items-center">
              <h2 className="mb-4">Are you sure you want to delete this event?</h2>
              <div>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                  onClick={handleDelete}
                >
                  Yes, delete it
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  No, keep it
                </button>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <div className="text-red-500">Event not found.</div>
      )}
    </div>
  );
}
export default EventDetailPage;
