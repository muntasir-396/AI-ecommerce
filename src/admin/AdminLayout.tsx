import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-admin-bg font-admin-body text-admin-ivory relative overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 admin-noise z-0" />
      
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 relative z-10">
        <AdminTopbar />
        <main className="flex-grow p-8 custom-scrollbar overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
