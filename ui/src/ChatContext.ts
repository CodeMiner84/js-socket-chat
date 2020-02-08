import React, { createContext, useContext } from 'react';
import SocketService from './utils/SocketService';

export const ChatContext: React.Context<SocketService> = createContext(new SocketService());

export const useChat = () => useContext(ChatContext);
