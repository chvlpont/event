'use client'
import React, { useState, Suspense } from 'react';
import { BounceLoader } from 'react-spinners';
const Sidebar = React.lazy(() => import('./_components/sidebar'));
const MainContent = React.lazy(() => import('./_components/mainContent'));
const AdminNavbar = React.lazy(() => import('./_components/adminNavbar'));


function AdminLayout({ children }) {
  const [selectedPage, setSelectedPage] = useState('Dashboard'); 

  const loader = (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <Suspense fallback={loader}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar setSelectedPage={setSelectedPage} />
        <main className="flex-1 overflow-y-auto bg-gray-400"> 
          {/* <AdminNavbar/>  */}
          <MainContent selectedPage={selectedPage} />
          { children }
        </main>
      </div>
    </Suspense>
  );
}

export default AdminLayout