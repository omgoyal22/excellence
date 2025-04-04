
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
