"use client";
import React, { useState, useRef } from "react";
import { createEvent } from "../../../utils/eventservices"; // Import createEvent function
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    date: "",
    description: "",
    numberOfSeats: "",
    imageFile: null,
  });
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      imageFile: file,
    });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      title,
      location,
      category,
      date,
      description,
      numberOfSeats,
      imageFile,
    } = formData;

    // Check if all fields have been filled
    if (title === "") {
      toast.error("Please enter a title.");
      return;
    }
    if (location === "") {
      toast.error("Please enter a location.");
      return;
    }
    if (category === "") {
      toast.error("Please select a category.");
      return;
    }
    if (date === "") {
      toast.error("Please select a date.");
      return;
    }
    if (description === "") {
      toast.error("Please enter a description.");
      return;
    }
    if (numberOfSeats === "") {
      toast.error("Please enter the number of seats.");
      return;
    }
    if (imageFile === null) {
      toast.error("Please upload an image.");
      return;
    }
    try {
      const {
        title,
        location,
        category,
        date,
        description,
        numberOfSeats,
        imageFile,
      } = formData;
      const eventId = await createEvent(
        title,
        date,
        description,
        imageFile,
        category,
        location,
        numberOfSeats
      );
      console.log("Event created successfully! Event ID:", eventId);
      toast.success("Event created successfully!"); // Show success toast
      setFormData({
        title: "",
        location: "",
        category: "",
        date: "",
        description: "",
        numberOfSeats: "",
        imageFile: null,
      });
      fileInputRef.current.value = ""; // Reset the file input field
      setPreviewImage(null); // Reset the preview image
    } catch (error) {
      console.error("Failed to create event:", error);
      toast.error("Failed to create event."); // Show error toast
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg"
      >
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
            className="form-select mt-1 pl-1 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Select a category</option>
            <option>Arts & Culture</option>
            <option>Conference</option>
            <option>Food & Beverage</option>
            <option>Festival</option>
            <option>Party</option>
            <option>Seminar</option>
            <option>Sports</option>
            <option>Technology</option>
            <option>Workshop</option>
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-300">Date & Time:</span>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input mt-1 pl-1 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
          <input
            type="number"
            name="numberOfSeats"
            min="1"
            value={formData.numberOfSeats}
            onChange={handleChange}
            className="form-input mt-1 pl-2 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-300">Upload Images:</span>
          <input
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="block w-full my-4 text-sm text-gray-400
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100
      "
            multiple
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-16 h-16 rounded-full shadow my-4"
            />
          )}
        </label>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none active:scale-95 transition duration-200 ease-in-out"
        >
          Create Event
        </button>
      </form>
    </>
  );
}

export default CreateEvent;
