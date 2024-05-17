'use-client'

import { db } from "@/firebase.config"
import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"


function EventList() {

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
  
  if (loading) return <div>Loading...</div>

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-t-lg shadow-lg grid grid-cols-7 items-center font-bold">
      <p className="col-span-1"></p>
      <p className="text-blue-500 font-semibold">Title</p>
        <p className="text-blue-500 font-semibold">Date</p>
        <p className="text-blue-500 font-semibold">Location</p>
        <p className="text-blue-500 font-semibold ">Description</p>
        <p className="text-blue-500 font-semibold text-center">Registrants</p>
        <p className="text-blue-500 font-semibold text-center">Actions</p>
    </div>
    {eventList.map((event, index) => (
      <div key={event.id} className={`bg-white dark:bg-gray-800 p-4 shadow-lg grid grid-cols-7 items-center ${index === eventList.length - 1 ? 'rounded-b-lg' : ''}`}>
        <img src={event.image} alt="Event" className="w-16 h-16 rounded-full shadow col-span-1"/>
        <h2 className="text-lg font-semibold col-span-1">{event.title}</h2>
        <p className="col-span-1">{event.date}</p>
        <p className="col-span-1">{event.location}</p>
        <p className="line-clamp-2 col-span-1">{event.description}</p>
      <div className="flex items-center justify-center col-span-1">
        <span>{event.registrants}/{event.limit}</span>
        {event.registrants >= event.limit && <span className="ml-2 text-red-500">(Full)</span>}
      </div>
      <button type="submit" className="w-full py-3 px-4 bg-blue-400 text-white dark:bg-blue-600 dark:text-gray-200 rounded hover:bg-blue-500 dark:hover:bg-blue-900 focus:outline-none active:scale-95 transition duration-200 ease-in-out col-span-1">
        Edit
      </button>
      </div>
    ))}
    </div>
  );
}

export default EventList;