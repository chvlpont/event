import React from 'react';
import Dashboard from '../(dashboard)/dashboard';
import User from '../(user)/user';
import Event from '../(event)/event';
import CreateEvent from '../(createEvent)/createEvent';
import EditEvent from '../(editEvent)/editEvent';
import CMSDashboard from '../(CMSDashboard)/CMSDashboard';
import Settings from '../(settings)/settings';

function MainContent({ selectedPage }) {
  return (
    <div key={selectedPage}>
      {selectedPage === 'Dashboard' && <Dashboard />}
      {selectedPage === 'User' && <User />}
      {selectedPage === 'Event' && <Event />}
      {selectedPage === 'CreateEvent' && <CreateEvent />}
      {selectedPage === 'EditEvent' && <EditEvent />}
      {selectedPage === 'CMSDashboard' && <CMSDashboard />}
      {selectedPage === 'Settings' && <Settings />}
      {selectedPage === 'default' && <Dashboard />}
    </div>
  );
}

export default MainContent;