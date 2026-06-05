import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const StudentLayout = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />
      <div className="flex">
        <Sidebar
          user={user}
          onLogout={onLogout}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 p-6 md:p-8">
          <button
            className="md:hidden mb-4 text-gray-600"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰ Menu
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
