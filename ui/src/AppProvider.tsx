import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import useSocket from 'use-socket.io-client';
import Login from './components/Login';
import Chat from './components/Chat';
import config from './config';
import App from './App';

const ENDPOINT = process.env.REACT_APP_API_URL;

export const AppContext = React.createContext({});

const AppProvider = (props: any) => {
  const [socket] = useSocket(ENDPOINT);

  socket.connect();

  return <AppContext.Provider value={{ socket }}>{props.children}</AppContext.Provider>;
};

export default AppProvider;
