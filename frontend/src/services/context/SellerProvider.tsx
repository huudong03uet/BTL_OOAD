// 'use client'
import React, { createContext, useState } from 'react';
import Seller from '@/models/seller';
import { SellerContext } from './SellerContext';


const SellerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seller, setSeller] = useState<any>(null); // Manage Seller state
  return (
    <SellerContext.Provider value={ {seller, setSeller} }>
      {children}
    </SellerContext.Provider>
  );
};

export default SellerProvider;
