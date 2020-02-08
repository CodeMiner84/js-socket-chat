import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import useSocket from 'use-socket.io-client';
import Login from './components/Login';
import Chat from './components/Chat';
import config from './config';
import './App.scss';
import AddNewRoom from './components/Room/AddNewRoom';
import RoomDto from './components/Room/Room.dto';

const ENDPOINT = process.env.REACT_APP_API_URL;

const App = () => {
  const [user, setUser] = useState('');
  const [roomAdding, settingNewRoom] = useState(false);
  const [socket] = useSocket(ENDPOINT);

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
    socket.connect();
  }, [socket]);

  return (
    <div className="App">
      {roomAdding &&
        <AddNewRoom
          socket={socket}
          handleAddRoom={handleAddRoom}
          backToChat={backToChat}
        />
      }
      {!roomAdding && (
        <>
          {user === '' && <Login setUser={handleSetUser} user={user} socket={socket} />}
          {user !== '' && <Chat socket={socket} onAddNewRoom={handleAddNewRoom} />}
        </>
      )}
    </div>
  );
};

export default App;
