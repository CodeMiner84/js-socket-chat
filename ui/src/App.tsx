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

  function handleSetNickName(nickname: any) {
    setNickName(nickname);
    localStorage.setItem(config.nickName, nickname);
  }

  useEffect(() => {
    const nickNameFromStorage = localStorage.getItem(config.nickName);
    if (nickNameFromStorage) {
      setNickName(nickNameFromStorage);
    }
    socket.connect();
    socket.on('message', (data: any) => {
      console.log('incoming message', data);
    });
  }, [socket]);

  return (
    <div className="App">
      {nickname === '' && <Login setNickName={handleSetNickName} nickname={nickname} socket={socket} />}
      {nickname !== '' && <Chat nickName={nickname} />}
    </div>
  );
};

export default (App);
