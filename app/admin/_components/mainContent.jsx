import React from 'react';
import Dashboard from './Dashboard';
import User from './User';
import Event from './Event'; 
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import CMSDashboard from './CMSDashboard';
import Settings from './Settings';

function MainContent({ selectedPage }) {
  switch (selectedPage) {
    case 'Dashboard':
      return <Dashboard />;
    case 'User':
      return <User />;
      case 'Event': 
      return <Event />;
    case 'CreateEvent':
      return <CreateEvent />;
    case 'EditEvent':
      return <EditEvent />;
    case 'CMSDashboard':
      return <CMSDashboard />;
    case 'Settings':
      return <Settings />;
    default:
      return <Dashboard />;
  }
}

export default MainContent;