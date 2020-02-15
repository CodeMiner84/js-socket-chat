import React, { useState, useEffect, useContext } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import config from './config';
import './App.scss';
import AddNewRoom from './components/Room/AddNewRoom';
import RoomDto from './models/Room.dto';
import { useChat } from './ChatContext';
import User from './models/User';
import MessageDto from './models/Message';

const App = () => {
  const chatContext = useChat();

  chatContext.init();
  const [user, setUser] = useState();
  const [roomAdding, settingNewRoom] = useState(false);
  const initialRoomsState: RoomDto[] = [];
  const [rooms, setRooms] = useState(initialRoomsState);
  const initalMessagesState: any = [];
  const [messages, setMessages] = useState(initalMessagesState);

  useEffect(() => {
    const userFromStorage = localStorage.getItem(config.user);
    if (userFromStorage) {
      setUser(userFromStorage);
    }

    if (localStorage.getItem(config.user)) {
      chatContext.socket.emit('changeRoom', {
        userId: localStorage.getItem(config.user),
      });
    }
    chatContext.socket.emit('getRooms');
    chatContext.socket.on('roomsFetched', (rooms: RoomDto[]) => {
      setRooms(rooms);
    });
    chatContext.socket.emit('fetchMessages', { userId: localStorage.getItem(config.user) });

    chatContext.socket.on('roomChanged', () => setMessages([]));

    return () => {
      chatContext.disconnect();
    };
  }, [0]);

  chatContext.socket.on('getMessages', (newMessages: MessageDto[]) => {
    setMessages([...newMessages]);
  });

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
          {user && (
            <Chat onAddNewRoom={handleAddNewRoom} handleLogout={handleLogout} messages={[...messages]} rooms={rooms} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
