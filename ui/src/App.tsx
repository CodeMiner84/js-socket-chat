import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import useSocket from 'use-socket.io-client';
import Login from './components/Login';
import Chat from './components/Chat';
import config from './config';
import './App.scss';
import AddNewRoom from './components/Room/AddNewRoom';
import RoomDto from './components/Room/Room.dto';
import { useChat } from './ChatContext';

const ENDPOINT = process.env.REACT_APP_API_URL;

const App = () => {
  const chatContext = useChat();

  const [user, setUser] = useState('');
  const [roomAdding, settingNewRoom] = useState(false);

  chatContext.init();
  function handleSetUser(newNickname: any): void {
    setUser(newNickname);
    localStorage.setItem(config.user, newNickname);
  }

  function handleAddRoom(newRoom: RoomDto): void {
    settingNewRoom(false);
    localStorage.setItem(config.room, newRoom.id);
  }

  function handleAddNewRoom(): void {
    settingNewRoom(true);
  }

  function backToChat(): void {
    settingNewRoom(false);
  }

  useEffect(() => {
    const userFromStorage = localStorage.getItem(config.user);
    if (userFromStorage) {
      setUser(userFromStorage);
    }
    chatContext.init();

    return () => {
      chatContext.disconnect();
    };
  }, [0]);

  return (
    <div className="App">
      {roomAdding && <AddNewRoom handleAddRoom={handleAddRoom} backToChat={backToChat} />}
      {!roomAdding && (
        <>
          {user === '' && <Login setUser={handleSetUser} user={user} />}
          {user !== '' && <Chat onAddNewRoom={handleAddNewRoom} />}
        </>
      )}
    </div>
  );
};

export default App;
