'use client'
import React, { useState, useEffect } from 'react'
import { FaUser, FaCog, FaCalendarCheck, FaCalendarPlus, FaEdit, FaPaintBrush, FaAngleDoubleRight, FaAngleDoubleLeft, FaChevronDown, FaChevronRight, FaSignOutAlt  } from 'react-icons/fa'
import { MdDashboard } from "react-icons/md";
import Link from 'next/link';
import dynamic from 'next/dynamic';


const SignOutButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.SignOutButton), { ssr: false });

function Sidebar() {
  const [showEventOptions, setShowEventOptions] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [activeSubPage, setActiveSubPage] = useState('');

  useEffect(() => {
    setIsCollapsed(window.innerWidth <= 640);
  }, []);

  const handlePageSelect = (page, subPage) => {
    setActivePage(page);
    setActiveSubPage(subPage || '');

    if (page === 'event' && !subPage) {
      setShowEventOptions(!showEventOptions);
    } else {
      setShowEventOptions(false);
    }
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter') {
      action();
    }
  };

  return (
    <div className={`h-screen bg-gray-800 text-white flex flex-col items-start justify-start pt-2 transition-all duration-500 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center w-full mb-2 p-4 justify-between h-[60px]">
        {!isCollapsed && <h1 className="h-7 w-auto text-white text-center text-2xl font-bold tracking-wide ">AdminPanel</h1>}
        {isCollapsed 
          ? <FaAngleDoubleRight className="text-white ml-auto mr-2 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)} onKeyDown={(event) => handleKeyDown(event, () => setIsCollapsed(!isCollapsed))} tabIndex="0" role="button" aria-label="Expand Sidebar" />
          : <FaAngleDoubleLeft className="text-white mr-2 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)} onKeyDown={(event) => handleKeyDown(event, () => setIsCollapsed(!isCollapsed))} tabIndex="0" role="button" aria-label="Collapse Sidebar" />}
      </div>
      <hr className="border-t border-gray-700 w-full mb-5"/>

      <Link href="/admin/dashboard" className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'dashboard' ? 'bg-gray-700 text-white border-l-4 border-blue-500' : ''}`} onClick={() => handlePageSelect('dashboard')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('dashboard'))} tabIndex="0" role="button" aria-label="Dashboard">
        <MdDashboard className="text-white mr-2" />
        {!isCollapsed && <p className="text-white transition-opacity duration-500 ease-in-out ">Dashboard</p>}
      </Link>

      <div className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'event' ? 'bg-gray-700 text-white border-l-4 border-red-500' : ''}`} onClick={() => { handlePageSelect('event'); setShowEventOptions(!showEventOptions); }} onKeyDown={(event) => handleKeyDown(event, () => { handlePageSelect('event'); setShowEventOptions(!showEventOptions); })} tabIndex="0" role="button" aria-label="Event">
        <FaCalendarCheck className="text-white mr-2" />
        {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Event</p>}
        {!isCollapsed && (showEventOptions ? <FaChevronDown className="text-white ml-auto" /> : <FaChevronRight className="text-white ml-auto" />)}
      </div>

      {showEventOptions && (
        <>
          <Link href="/admin/event/createEvent" className="cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 pl-8" onClick={() => handlePageSelect('event', 'createEvent')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('event', 'createEvent'))} tabIndex="0" role="button" aria-label="Create Event">
            <FaCalendarPlus className={`text-white mr-2 ${activePage === 'event' && activeSubPage === 'createEvent' ? '!text-blue-500' : ''}`} />
            {!isCollapsed && <p className={`text-white ${activePage === 'event' && activeSubPage === 'createEvent' ? '!text-blue-500' : ''}`}>Create Event</p>}
          </Link>

          <Link href="/admin/event/editEvent" className="cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 pl-8" onClick={() => handlePageSelect('event', 'editEvent')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('event', 'editEvent'))} tabIndex="0" role="button" aria-label="Edit Event">
            <FaEdit className={`text-white mr-2 ${activeSubPage === 'editEvent' ? 'text-yellow-500' : ''}`} />
            {!isCollapsed && <p className={`text-white ${activeSubPage === 'editEvent' ? 'text-yellow-500' : ''}`}>Edit Event</p>}
          </Link>
        </>
      )}

      <Link href="/admin/user" className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'user' ? 'bg-gray-700 text-white border-l-4 border-indigo-500' : ''}`} onClick={() => handlePageSelect('user')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('user'))} tabIndex="0" role="button" aria-label="Users">
        <FaUser className="text-white mr-2" />
        {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Users</p>}
      </Link>

      <Link href="/admin/CMSDashboard" className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'CMSDashboard' ? 'bg-gray-700 text-white border-l-4 border-pink-500' : ''}`} onClick={() => handlePageSelect('CMSDashboard')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('CMSDashboard'))} tabIndex="0" role="button" aria-label="Site Builder">
        <FaPaintBrush className="text-white mr-2" />
        {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Site Builder</p>}
      </Link>

      <Link href="/admin/settings" className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'settings' ? 'bg-gray-700 text-white border-l-4 border-teal-500' : ''}`} onClick={() => handlePageSelect('settings')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('settings'))} tabIndex="0" role="button" aria-label="Settings">
        <FaCog className="text-white mr-2" />
        {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Settings</p>}
      </Link>

      <SignOutButton className="mt-auto cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4">
        <div className="flex items-center">
          <FaSignOutAlt className="text-white mr-2" />
          {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Log out</p>}
        </div>
      </SignOutButton>
    </div>
  );
}

export default Sidebar;