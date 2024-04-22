// 'use client'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react';
import Seller from '@/models/seller';

interface ChatContextValue {
  openChat: boolean;
  setOpenChat: Dispatch<SetStateAction<boolean | null>>;
  userContactId: number | null;
  setUserContactId: Dispatch<SetStateAction<number | null>>;
}

const ChatContext = createContext<ChatContextValue>({
  openChat: false,
  setOpenChat: () => {},
  userContactId: null,
  setUserContactId: () => {},
});
export { ChatContext };

