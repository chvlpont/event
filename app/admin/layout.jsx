'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { BounceLoader } from 'react-spinners';
const Sidebar = React.lazy(() => import('./_components/sidebar'));
const MainContent = React.lazy(() => import('./_components/mainContent'));
const AdminNavbar = React.lazy(() => import('./_components/adminNavbar'));


function AdminLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const loader = (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!isMounted) {
    return loader;
  }

  return (
    <Suspense fallback={loader}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-400">
          <AdminNavbar />
         
          {children}
        </main>
      </div>
    </Suspense>
  );
}

export default AdminLayout