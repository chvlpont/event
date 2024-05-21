
'use client';
import React, { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { events } from '@/components/eventList';
import { FaUpload } from "react-icons/fa";

function EventDetailPage() {
  const { id } = useParams();  // Correct use of useParams from next/navigation
  const event = events.find(event => event.id === parseInt(id, 10));  // use parseInt to convert id to number

  if (!event) {
    return <p>No event found with ID {id}</p>;
  }

  const handleSave = (updatedEvent) => {
    // Implement the logic to save the updated event to the database
    console.log(updatedEvent);
  };

  return <EventDetails event={event} onSave={handleSave} />;
}

const EventDetails = ({ event, onSave }) => {
  const { title, image, location, date, registrants, limit, description, category } = event;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newLocation, setNewLocation] = useState(location);
  const [newDate, setNewDate] = useState(date);
  const [newRegistrants, setNewRegistrants] = useState(registrants);
  const [newLimit, setNewLimit] = useState(limit);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);
  const limitInputRef = useRef(); 
  const [newImage, setNewImage] = useState(image);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [registeredUsers, setRegisteredUsers] = useState([
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    { name: 'Robert Johnson', email: 'robert.johnson@example.com' },
    { name: 'Emily Davis', email: 'emily.davis@example.com' },
    { name: 'Michael Brown', email: 'michael.brown@example.com' },
    { name: 'Sarah Miller', email: 'sarah.miller@example.com' },
    { name: 'James Wilson', email: 'james.wilson@example.com' },
    // Add more users as needed
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = (setter) => (e) => {
    setter(e.target.innerText);
  };

  const handleSave = () => {
    onSave({ title: newTitle, image: newImage, location: newLocation, date: newDate, registrants: newRegistrants, limit: newLimit, description: newDescription, category: newCategory });
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Implement the logic to delete the event from the database
    console.log('Event deleted');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-8 relative">
      <div className="flex">
        <div className="w-1/2 relative">
          {isEditing ? 
            <div>
              <img className="w-full h-80 object-fill" src={newImage} alt="Event" />
              <label className="absolute bottom-0 mb-[48px] left-1/2 transform -translate-x-1/2 w-1/4 text-white cursor-pointer bg-blue-500 hover:bg-blue-600 py-2 flex justify-center items-center rounded">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden"
                />
                <FaUpload className="mr-2" /> Upload Image
              </label>
            </div> : 
            <img className="w-full h-80 object-fill" src={image} alt="Event" />
          }
        </div>
        <div className="w-1/2 pl-8">
          <h1 
            className="text-4xl mb-4 text-white" 
            contentEditable={isEditing} 
            onBlur={handleBlur(setNewTitle)} 
            suppressContentEditableWarning 
            style={isEditing ? { display: 'inline-block' } : {}}
          >
            {title}
          </h1>
          <p className={`text-white ${isEditing ? 'cursor-pointer' : ''}`}>
            Location:  <span contentEditable={isEditing} onBlur={handleBlur(setNewLocation)} suppressContentEditableWarning>{location}</span>
          </p>
          <p className={`text-white ${isEditing ? 'cursor-pointer' : ''}`}>
            Category:  <span contentEditable={isEditing} onBlur={handleBlur(setNewCategory)} suppressContentEditableWarning>{newCategory}</span>
          </p>
          <p className="text-white">
            Date: 
            {isEditing ? 
              <input 
                type="date" 
                defaultValue={newDate} 
                onBlur={(e) => setNewDate(e.target.value)} 
                className="bg-transparent  w-28 cursor-pointer"
              /> : 
              <span>{date}</span>
            }
          </p>
          <p className="text-white">
            Registrants: <span>{registrants}</span>/
            {isEditing ? 
              <input 
                type="number" 
                min={registrants} 
                step="1" 
                defaultValue={newLimit} 
                onBlur={(e) => {
                  const value = Math.max(Number(e.target.value), registrants);
                  setNewLimit(value);
                  limitInputRef.current.value = value; 
                }} 
                ref={limitInputRef} 
                className="bg-transparent border-b w-14 cursor-pointer "
              />: 
              <span>{limit}</span>
            } 
            {registrants === limit && !isEditing && <span className="text-red-500"> (Full)</span>}
          </p>
          <div className=" p-4 rounded ">
            <h3 className="text-white text-lg font-semibold mb-2">Registered Users:</h3>
            <div className="max-h-36 overflow-y-auto">
              <ul className="space-y-2">
                {registeredUsers.map((user, index) => (
                  <li key={index} className="flex items-center bg-gray-700 p-2 rounded-md">
                    <span className="text-gray-300 mr-2">{index + 1}.</span>
                    <div className="flex-1 flex justify-between">
                      <span className="text-white font-medium">{user.name}</span>
                      <span className="text-gray-400">{user.email}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full mt-8 ${isEditing ? 'cursor-pointer' : ''}`}>
        <h2 className="text-2xl mb-2 text-white">Description:</h2>
        <p className="text-gray-300" contentEditable={isEditing} onBlur={handleBlur(setNewDescription)} suppressContentEditableWarning>{description}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`px-4 py-2 rounded ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        {isEditing && (
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white ml-4"
          >
            Delete
          </button>
        )}
      </div>
      {isDeleteModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 w-[400px] h-[200px] flex flex-col items-center justify-center rounded-lg">
            <h2 className="text-2xl text-white mb-4">Are you sure you want to delete this event?</h2>
            <div className="flex">
              <button 
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white mr-2"
              >
                Yes, delete it
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
              >
                No, keep it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;