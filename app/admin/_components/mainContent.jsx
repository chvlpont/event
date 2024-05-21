'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Dashboard from '../dashboard/page';
import User from '../user/page';
import Event from '../event/page';
import CreateEvent from '../event/createEvent/page';
import EditEvent from '../event/editEvent/page';
import CMSDashboard from '../CMSDashboard/page';
import Settings from '../settings/page';
import EventDetailPage from '../event/[id]/page';

function MainContent() {
  const pathname = usePathname();

  const getPageComponent = () => {
    if (pathname === '/admin/dashboard') {
      return <Dashboard />;
    } else if (pathname === '/admin/user') {
      return <User />;
    } else if (pathname === '/admin/event') {
      return <Event />;
    } else if (pathname === '/admin/event/createEvent') {
      return <CreateEvent />;
    } else if (pathname === '/admin/event/editEvent') {
      return <EditEvent />;
    } else if (pathname === '/admin/CMSDashboard') {
      return <CMSDashboard />;
    } else if (pathname === '/admin/settings') {
      return <Settings />;
    } else if (pathname.startsWith('/admin/event/') && pathname.split('/').length === 4) {
      return <EventDetailPage />;
    } else {
      return <Dashboard />;
    }
  };

  return <div>{getPageComponent()}</div>;
}
export default MainContent;