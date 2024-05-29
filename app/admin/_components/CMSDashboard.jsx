'use client'
import React, { useState, useRef } from 'react';

function CMSPage() {
  // Initial hardcoded values
  const initialTitle = 'En jättebra rubrik';
  const initialContent = 'en cool slogan';
  const initialImage = 'https://images.unsplash.com/photo-1622465911368-72162f8da3e2?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  // State hooks with initial values
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState(initialImage);
  const [imagePreview, setImagePreview] = useState(initialImage);
  const fileInputRef = useRef(); // Creating a ref for file input

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Update the preview image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content, image });
    // Here you would handle the form submission to a backend or state management
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setContent(initialContent);
    setImagePreview(initialImage);
    fileInputRef.current.value = ""; // Reset file input
  };

  return (
    <div className="flex justify-center items-center h-screen">
   <form onSubmit={handleSubmit} className="bg-gray-800 w-2/4 h-3/4 shadow rounded-lg p-6">
      {/* Title Edit */}
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2  text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 pl-2 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter title"
        />
      </div>

      {/* Text Edit */}
      <div className="mb-6">
        <label htmlFor="content" className="block mb-4 text-sm font-medium text-gray-300">Content</label>
        <textarea
          id="content"
          name="content"
          rows="4"
          value={content}
          onChange={handleContentChange}
          className=" mt-1 pl-2 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter content"
        ></textarea>
      </div>

      {/* Image Upload */}
      <div className="mb-6 flex justify-center items-center flex-col">
  <label className="block mb-4 text-sm font-medium text-gray-300">Image Upload</label>
  <div className="flex justify-center">
    <input
    ref={fileInputRef}
      type="file"
      name="image"
      onChange={handleImageChange}
      className="block w-full mb-4 text-sm text-gray-400
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100
      "
    />
  </div>
  {imagePreview && (
    <div className="w-72 h-56 flex justify-center">
      <img src={imagePreview} alt="Preview" className="h-auto object-cover rounded" />
    </div>
  )}
</div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button type="button" onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          Save Changes
        </button>
      </div>
    </form>
    </div>
  );
}

export default CMSPage;
