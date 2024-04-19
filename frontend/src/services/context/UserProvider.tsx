// 'use client'
import React, { createContext, useState } from 'react';
import User from '@/models/user';
import { UserContext } from './UserContext';


const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Manage user state
  return (
    <UserContext.Provider value={ {user, setUser} }>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
