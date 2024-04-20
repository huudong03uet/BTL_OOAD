// 'use client'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react';
import Seller from '@/models/seller';

interface SellerContextValue {
  seller: Seller | null;
  setSeller: Dispatch<SetStateAction<Seller | null>>
}

const SellerContext = React.createContext<SellerContextValue>({
  seller: null,
  setSeller: () => {},
});

export { SellerContext };

