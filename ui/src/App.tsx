import React, { useState, useEffect, useContext } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import config from './config';
import './App.scss';
import AddNewRoom from './components/Room/AddNewRoom';
import RoomDto from './models/Room.dto';
import { useChat } from './ChatContext';
import User from './models/User';

const App = () => {
  const chatContext = useChat();

  const [user, setUser] = useState();
  const [roomAdding, settingNewRoom] = useState(false);
  useEffect(() => {
    const userFromStorage = localStorage.getItem(config.user);
    if (userFromStorage) {
      setUser(userFromStorage);
    }
    chatContext.init();

    chatContext.socket.emit('fetchMessages', {userId: localStorage.getItem(config.user)});

    return () => {
      chatContext.disconnect();
    };
  }, [0]);

  chatContext.init();

  const handleSetUser = (newUser: User): void => {
    setUser(newUser);
    localStorage.setItem(config.user, newUser.id);
  };

  const handleLogout = () => {
    setUser('');
    localStorage.removeItem(config.user);
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
          {user === undefined && <Login handleSetUser={handleSetUser} user={user} />}
          {user && <Chat onAddNewRoom={handleAddNewRoom} handleLogout={handleLogout} />}
        </>
      )}
    </div>
  );
};

export default App;
