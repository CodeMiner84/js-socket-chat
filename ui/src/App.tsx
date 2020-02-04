import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import useSocket from 'use-socket.io-client';
import Login from './components/Login';
import { withRouter } from "react-router";

const App = (props: any) => {

  const [nickname, setNickName] = useState('');
  const [messages, setMessage] = useState([]);
  const [input, setInput] = useState('');
  const ENDPOINT = 'http://localhost:8080';
  const [socket] = useSocket(ENDPOINT)

  socket.connect();
console.log('nickname@@@', nickname);
  function handleSetNickName (nickname: any) {
    setNickName(nickname);
  }

  console.log('props', props);

  useEffect(()=>{
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            <button onClick={() => {
              setInput('asdasd');
              socket.emit('sendMessage', {room: input});
            }}>TEST
            </button>
            {/*<input type="text" onChange={(e) => setInput(e.target.value)}/>*/}
          </p>
          {messages.map(item => {
            return <div>{item}</div>
          })}
        </header>
        }
      </div>
  );
};

export default withRouter(App);
