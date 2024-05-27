import React from 'react';
import EventList from '../../_components/eventList';

function EditEvent() {
  return (
    <div>
      <div className='p-4 text-center'>
      <h1 className='text-4xl'>Edit Event</h1>
      <p>Welcome to the edit event page!</p>
      </div>
      <div className="p-4">
  <EventList />
</div>
    </div>
  );
}

export default EditEvent;