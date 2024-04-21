// 'use client'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react';
import Admin from '@/types/admin';

interface AdminContextValue {
  admin: Admin | null;
  setAdmin: Dispatch<SetStateAction<Admin | null>>
}

const AdminContext = React.createContext<AdminContextValue>({
  admin: null,
  setAdmin: () => {},
});

export { AdminContext };

