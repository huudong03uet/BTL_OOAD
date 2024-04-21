// 'use client'
import React, { createContext, useState } from 'react';
import Admin from '@/types/admin';
import { AdminContext } from './AdminContext';


const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<any>(null); // Manage Admin state
  return (
    <AdminContext.Provider value={ {admin, setAdmin} }>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
