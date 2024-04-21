// 'use client'
import React, { createContext, useState } from 'react';
import { ChatContext } from './ChatContext';

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openChat, setOpenChat] = useState<any>(null); // Manage Seller state
  const [userContactId, setUserContactId] = useState<any>(null); // Manage Seller state
  return (
    <ChatContext.Provider value={ { openChat,  setOpenChat, userContactId, setUserContactId } }>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
