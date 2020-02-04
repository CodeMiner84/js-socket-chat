import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import useSocket from 'use-socket.io-client';
import Login from './components/Login';
import Chat from './components/Chat';
import { withRouter } from "react-router";

const ENDPOINT = process.env.REACT_APP_API_URL

const App = (props: any) => {
  const [nickname, setNickName] = useState('');
  const [messages, setMessage] = useState([]);
  const [input, setInput] = useState('');;
  const [socket] = useSocket(ENDPOINT)

  function handleSetNickName (nickname: any) {
    setNickName(nickname);
  }

  useEffect(()=>{
    socket.connect();
    socket.on('message', (data: any) => {
      console.log('incoming message', data)
    });
  }, [ENDPOINT]);

  return (
      <div className="App">
        {nickname === '' &&
          <Login setNickName={handleSetNickName} nickname={nickname} />
        }
        {nickname !== '' &&
            <Chat nickName={nickname} />
        }
      </div>
  );
};

export default withRouter(App);
