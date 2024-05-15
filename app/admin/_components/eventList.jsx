import react from 'react';

function EventList() {
    // Placeholder data
    const events = [
        { id: 1, title: 'Event 1', date: '2024-06-01', location: 'Location 1', description: 'This is a short description of Event 1.', registrants: 13, limit: 20, image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 2, title: 'Event 2', date: '2024-07-30', location: 'Location 2', description: 'This is a short description of Event 2.', registrants: 5, limit: 15, image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, title: 'Event 3', date: '2024-08-03', location: 'Location 3', description: 'This is a short description of Event 3.This is a short description of Event 3.', registrants: 20, limit: 20, image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        // Add more events...
    ];

      // Helper function to limit the number of words
  const limitWords = (str, num) => {
    return str.split(" ").splice(0,num).join(" ") + "...";
  };
  
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
      {events.map((event, index) => (
        <div key={event.id} className={`bg-white dark:bg-gray-800 p-4 shadow-lg grid grid-cols-7 items-center ${index === events.length - 1 ? 'rounded-b-lg' : ''}`}>
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