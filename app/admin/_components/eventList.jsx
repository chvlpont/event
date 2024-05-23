
'use client';
import { db } from "@/firebase.config"
import { collection, onSnapshot, query } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"



function EventList({ searchTerm }) {

  const [eventList, setEventList] = useState([])
  const [ loading, setLoading ] = useState(true)

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

  return (
    <div className="divide-y divide-gray-700">
      <div className="bg-gray-800 p-4 rounded-t-lg shadow-lg grid grid-cols-7 items-center font-bold">
        <p className="col-span-1"></p>
        <p className="text-blue-500 font-semibold text-center ">Title</p>
        <p className="text-blue-500 font-semibold text-center">Date</p>
        <p className="text-blue-500 font-semibold text-center">Location</p>
        <p className="text-blue-500 font-semibold text-center ">Category</p>
        <p className="text-blue-500 font-semibold text-center">Registrants</p>
        <p className="text-blue-500 font-semibold text-center">Actions</p>
      </div>
      {filteredEvents.length > 0 ? filteredEvents.map((event, index) => (
        <div key={event.id} className={`bg-gray-800 p-4 shadow-lg grid grid-cols-7 gap-4 items-center ${index === filteredEvents.length - 1 ? 'rounded-b-lg' : ''}`}>
          <div className="flex justify-center items-center col-span-1">
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
          <Link href={`/admin/event/${event.id}`} passHref>
            <button
              className="w-full py-3 px-4 bg-blue-600 text-gray-200 rounded hover:bg-blue-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out col-span-1"
            >
              Edit
            </button>
          </Link>
        </div>
      )) : (
        <div className="text-center py-10">
          <p>No events found that match your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default EventList;
