'use client'
import React, { useState } from 'react';
import Sidebar from './_components/sidebar'
import MainContent from './_components/mainContent'

function Layout() {
    const [selectedPage, setSelectedPage] = useState('Dashboard'); // Initialize selectedPage state
  
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar setSelectedPage={setSelectedPage} /> {/* Pass setSelectedPage to Sidebar */}
        <main style={{ flex: 1, padding: '10px' }}>
          <MainContent selectedPage={selectedPage} /> {/* Replace children with MainContent */}
        </main>
      </div>
    );
  }

export default Layout