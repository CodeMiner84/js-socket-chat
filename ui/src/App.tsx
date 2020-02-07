import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import useSocket from 'use-socket.io-client';
import Login from './components/Login';
import Chat from './components/Chat';
import config from './config';
import './App.scss';

const ENDPOINT = process.env.REACT_APP_API_URL;

const App = () => {
  const [user, setUser] = useState('');
  const [socket] = useSocket(ENDPOINT);

  function handleSetUser(newNickname: any) {
    setUser(newNickname);
    localStorage.setItem(config.user, newNickname);
  }

  useEffect(() => {
    const userFromStorage = localStorage.getItem(config.user);
    if (userFromStorage) {
      setUser(userFromStorage);
    }
    socket.connect();
  }, [socket]);

  return (
    <div className="App">
      {user === '' && <Login setUser={handleSetUser} user={user} socket={socket} />}
      {user !== '' && <Chat socket={socket} />}
    </div>
  );
};

export default App;
