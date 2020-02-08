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

const App = () => {
  const chatContext = useChat();
  const [user, setUser] = useState('');
  const [roomAdding, settingNewRoom] = useState(false);
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

  chatContext.init();

  const handleSetUser = (newNickname: any): void => {
    setUser(newNickname);
    localStorage.setItem(config.user, newNickname);
  };

  const handleAddNewRoom = (): void => {
    settingNewRoom(true);
  };

  chatContext.socket.on('roomAdded', (newRoom: RoomDto) => {
    settingNewRoom(false);
  });

  const backToChat = (): void => {
    settingNewRoom(false);
  };

  return (
    <div className="App">
      {roomAdding && <AddNewRoom backToChat={backToChat} />}
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
