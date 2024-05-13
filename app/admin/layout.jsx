'use client'
import React, { useState } from 'react';
import Sidebar from './_components/sidebar'
import MainContent from './_components/mainContent'

function Layout() {
    const [selectedPage, setSelectedPage] = useState('Dashboard'); 
  
    return (
      <div className="flex h-screen overflow-hidden">
          <Sidebar setSelectedPage={setSelectedPage} />
          <main className="flex-1 overflow-y-auto p-2.5 bg-gray-400"> {/* Added bg-color for contrast */}
              <MainContent selectedPage={selectedPage} />
          </main>
      </div>
  );
}

export default Layout