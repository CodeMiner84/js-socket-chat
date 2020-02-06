import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import useSocket from 'use-socket.io-client';
import Login from './components/Login';
import Chat from './components/Chat';
import config from './config';
import './App.scss';

const ENDPOINT = process.env.REACT_APP_API_URL;

const App = () => {
  const [nickname, setNickName] = useState('');
  const [socket] = useSocket(ENDPOINT);

  function handleSetNickName(newNickname: any) {
    setNickName(newNickname);
    localStorage.setItem(config.nickName, newNickname);
  }

  useEffect(() => {
    const nickNameFromStorage = localStorage.getItem(config.nickName);
    if (nickNameFromStorage) {
      setNickName(nickNameFromStorage);
    }
    socket.connect();
    socket.on('message', (data: any) => {});
  }, [socket]);

  return (
    <div className="App">
      {nickname === '' && <Login setNickName={handleSetNickName} nickname={nickname} socket={socket} />}
      {nickname !== '' && <Chat nickName={nickname} />}
    </div>
  );
};

export default App;
