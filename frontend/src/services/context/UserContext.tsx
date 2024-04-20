// 'use client'
import React, { Dispatch, SetStateAction, createContext, useState } from 'react';
import User from '@/models/user';

interface UserContextValue {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
}

const UserContext = React.createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

export { UserContext };

