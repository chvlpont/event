
'use client';
import { db } from "@/firebase.config"
import { collection, onSnapshot, query } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { deleteEvent} from '@/utils/eventservices';
import Modal from 'react-modal';


function EventList({ searchTerm }) {

  const [eventList, setEventList] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLoading(false)
      setEventList(events);
    });
  
    return () => unsub();
  }, []);

  const filteredEvents = eventList.filter(event =>
    event.title.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await deleteEvent(eventToDelete);
      console.log('Event Deleted! Event ID:', eventToDelete);
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
    <div className="divide-y divide-gray-700">
      <div className="bg-gray-800 p-4 rounded-t-lg shadow-lg grid grid-cols-7 items-center font-bold">
        <p className="col-span-1"></p>
        <p className="text-blue-500 font-semibold text-center ">Title</p>
        <p className="text-blue-500 font-semibold text-center">Date</p>
        <p className="text-blue-500 font-semibold text-center">Location</p>
        <p className="text-blue-500 font-semibold text-center ">Category</p>
        <p className="text-blue-500 font-semibold text-center">Registrants</p>
        <p className="text-blue-500 font-semibold text-right">Actions</p>
      </div>
      {filteredEvents.length > 0 ? filteredEvents.map((event, index) => (
<div key={event.id} className={`bg-gray-800 p-4 shadow-lg grid grid-cols-7 gap-x-6 items-center ${index === filteredEvents.length - 1 ? 'rounded-b-lg' : ''}`}>
                  <div className="flex justify-center items-center col-span-1 px-2">
            <img src={event.imageUrl} alt="Event" className="w-16 h-16 rounded-full shadow"/>
          </div>
          <h2 className="text-lg font-semibold col-span-1 text-center text-white">{event.title}</h2>
          <p className="col-span-1 text-center text-white">{event.date.replace("T", " ")}</p>
          <p className="col-span-1 text-center text-white">{event.location}</p>
          <p className="line-clamp-2 col-span-1 text-center text-white">{event.category}</p>
          <div className="flex items-center justify-center col-span-1 text-white">
            <span>{event.bookedUsers?.length}/{event.numberOfSeats}</span>
            {event.bookedUsers?.length >= event.numberOfSeats && <span className="ml-2 text-red-500">(Full)</span>}
          </div>
          <div className="col-span-1 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IoEllipsisVerticalOutline />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 rounded p-2 shadow-2xl">
              <Link href={`/admin/event/${event.id}`} passHref>
  <DropdownMenuItem className="cursor-pointer">
    <button>Edit</button>
  </DropdownMenuItem>
</Link>
<DropdownMenuItem className="cursor-pointer" onClick={() => openModal(event.id)}>
  Delete
</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )) : (
        <div className="text-center py-10">
          <p>No events found that match your search criteria.</p>
          </div>
      )}
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
    </div>
  );
}

export default EventList;
