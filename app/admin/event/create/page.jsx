  import React from 'react';
  import CreateEvent from '../../_components/createEvent';

  function CreateEventPage() {
    return (
      <div className="container mx-auto px-4 py-8  flex flex-col justify-center items-center ">
        <h2 className="text-4xl font-bold text-center mb-6 ">Create Event</h2>
        <CreateEvent />
      </div>
    );
  }


  export default CreateEventPage;