'use client'
import React, { useState, useEffect } from 'react'
import { FaUser, FaCog, FaCalendarCheck, FaCalendarPlus, FaEdit, FaPaintBrush, FaAngleDoubleRight, FaAngleDoubleLeft, FaChevronDown, FaChevronRight, FaSignOutAlt  } from 'react-icons/fa'
import { MdDashboard } from "react-icons/md";

function Sidebar({ setSelectedPage }) {
  const [showEventOptions, setShowEventOptions] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // default to false
  const [activePage, setActivePage] = useState('Dashboard');
  const [activeSubPage, setActiveSubPage] = useState('');


  useEffect(() => {
    // set isCollapsed based on window width after component has mounted
    setIsCollapsed(window.innerWidth <= 640);
  }, []);

  // handlePageSelect function
  const handlePageSelect = (page, subPage) => {
    if (subPage) {
      setSelectedPage(subPage);
      setActiveSubPage(subPage);
    } else {
      setSelectedPage(page);
      setActiveSubPage('');
    }
    setActivePage(page); 
    if (page === 'Event' && !subPage) {
      setShowEventOptions(!showEventOptions);
    } else if (page !== 'Event') {
      setShowEventOptions(false);
    }
  };
  

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter') {
      action();
    }
  };



  return (
    <div className={`h-screen bg-gray-800 text-white flex flex-col items-start justify-start pt-5 transition-all duration-500 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center w-full mb-2 p-4 justify-between">
        {!isCollapsed && <h1 className="h-8 w-auto text-white text-center text-2xl font-bold tracking-wide ">AdminPanel</h1>} 
        {isCollapsed 
          ? <FaAngleDoubleRight className="text-white mr-2 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)} onKeyDown={(event) => handleKeyDown(event, () => setIsCollapsed(!isCollapsed))} tabIndex="0" role="button" aria-label="Expand Sidebar" /> 
          : <FaAngleDoubleLeft className="text-white mr-2 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)} onKeyDown={(event) => handleKeyDown(event, () => setIsCollapsed(!isCollapsed))} tabIndex="0" role="button" aria-label="Collapse Sidebar" />}
      </div>
      <hr className="border-t border-gray-700 w-full"/>
      
      <div className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'Dashboard' ? 'bg-gray-700 text-white border-l-4 border-blue-500' : ''}`} onClick={() => handlePageSelect('Dashboard')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('Dashboard'))} tabIndex="0" role="button" aria-label="Dashboard">
  <MdDashboard  className="text-white mr-2" />
  {!isCollapsed && <p className="text-white transition-opacity duration-500 ease-in-out ">Dashboard</p>}
</div>

<div className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'Event' ? 'bg-gray-700 text-white border-l-4 border-red-500' : ''}`} onClick={() => { handlePageSelect('Event'); setShowEventOptions(!showEventOptions); }} onKeyDown={(event) => handleKeyDown(event, () => { handlePageSelect('Event'); setShowEventOptions(!showEventOptions); })} tabIndex="0" role="button" aria-label="Event">
        <FaCalendarCheck className="text-white mr-2" />
        {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Event</p>}
        {!isCollapsed && (showEventOptions ? <FaChevronDown className="text-white ml-auto" /> : <FaChevronRight className="text-white ml-auto" />)}
      </div>
      {showEventOptions && (
        <>
<div className="cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 pl-8" onClick={() => handlePageSelect('Event', 'CreateEvent')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('Event', 'CreateEvent'))} tabIndex="0" role="button" aria-label="Create Event">
  <FaCalendarCheck className={`text-white mr-2 ${activeSubPage === 'CreateEvent' ? 'text-blue-500' : ''}`} />
  {!isCollapsed && <p className={`text-white ${activeSubPage === 'CreateEvent' ? 'text-blue-500' : ''}`}>Create Event</p>}
</div>


<div className="cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 pl-8" onClick={() => handlePageSelect('Event', 'EditEvent')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('Event', 'EditEvent'))} tabIndex="0" role="button" aria-label="Edit Event">
  <FaEdit className={`text-white mr-2 ${activeSubPage === 'EditEvent' ? 'text-yellow-500' : ''}`} />
  {!isCollapsed && <p className={`text-white ${activeSubPage === 'EditEvent' ? 'text-yellow-500' : ''}`}>Edit Event</p>}
</div>



        </>
      )}
    <div className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'User' ? 'bg-gray-700 text-white border-l-4 border-indigo-500' : ''}`} onClick={() => handlePageSelect('User')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('User'))} tabIndex="0" role="button" aria-label="Users">
  <FaUser className="text-white mr-2" />
  {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Users</p>}
</div>
<div className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'CMSDashboard' ? 'bg-gray-700 text-white border-l-4 border-pink-500' : ''}`} onClick={() => handlePageSelect('CMSDashboard')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('CMSDashboard'))} tabIndex="0" role="button" aria-label="Site Builder">
  <FaPaintBrush  className="text-white mr-2" />
  {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Site Builder</p>}
</div>

      <div className={`cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4 ${activePage === 'Settings' ? 'bg-gray-700 text-white border-l-4 border-teal-500' : ''}`} onClick={() => handlePageSelect('Settings')} onKeyDown={(event) => handleKeyDown(event, () => handlePageSelect('Settings'))} tabIndex="0" role="button" aria-label="Settings">
  <FaCog className="text-white mr-2" />
  {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Settings</p>}
</div>

      <div className="mt-auto cursor-pointer flex items-center w-full mb-2 hover:bg-gray-700 p-4" onClick={() => {/* Add your logout function here */}} onKeyDown={(event) => handleKeyDown(event, () => {/* Add your logout function here */})} tabIndex="0" role="button" aria-label="Log out">
        <FaSignOutAlt className="text-white mr-2" />
        {!isCollapsed && <p className={`text-white transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>Log out</p>}
      </div>

    </div>
  )
}

export default Sidebar;