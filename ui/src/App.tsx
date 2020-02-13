import React, { useState, useEffect, useContext } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import config from './config';
import './App.scss';
import AddNewRoom from './components/Room/AddNewRoom';
import RoomDto from './models/Room.dto';
import { useChat } from './ChatContext';
import User from './models/User';
import MessageDto from "./models/Message";

const App = () => {
  const chatContext = useChat();

  chatContext.init();
  const [user, setUser] = useState();
  const [roomAdding, settingNewRoom] = useState(false);
  // const initalMessagesState: MessageDto[] = [];
  // const [message, setMessage] = useState(initalMessagesState);
  const initialRoomsState: RoomDto[] = [];
  const [rooms, setRooms] = useState(initialRoomsState);
  const initalMessagesState2: MessageDto[] = [];
  const test: any = {messages: [], message: []};
  const [messages, setMessages] = useState(test);

  useEffect(() => {
    const userFromStorage = localStorage.getItem(config.user);
    if (userFromStorage) {
      setUser(userFromStorage);
    }

    chatContext.socket.emit('fetchMessages', { userId: localStorage.getItem(config.user) });
    chatContext.socket.emit('getRooms');
    chatContext.socket.on('roomsFetched', (rooms: RoomDto[]) => {
      setRooms(rooms);
    });

    return () => {
      chatContext.disconnect();
    };
  }, [0]);

  chatContext.socket.on('getMessages', async (newMessages: MessageDto[]) => {
    await setMessages({ messages: newMessages, message: []});
    console.log('get messages', messages);
  });

  chatContext.socket.on('receiveMessage', (newMessage: MessageDto) => {
    console.log('receiveMessage', messages.message);
    const arr: MessageDto[] = messages.message;
    arr.push(newMessage);
    setMessages({ messages: messages.messages, message: [...arr]});
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

  // console.log('[...messages, ...message]', [...messages.message, ...messages.message]);

  // chatContext.socket.on('receiveMessage', (newMessage: MessageDto) => {
  //   console.log('b', message);
  //   setMessage([...message, newMessage]);
  //   console.log('b', message);
  // });
  const backToChat = (): void => {
    settingNewRoom(false);
  };

  return (
    <div className="App">
      {roomAdding && <AddNewRoom backToChat={backToChat} />}
      {!roomAdding && (
        <>
          {user === undefined && <Login handleSetUser={handleSetUser} user={user} />}
          {user && <Chat
              onAddNewRoom={handleAddNewRoom}
              handleLogout={handleLogout}
              messages={[...messages.messages, ...messages.message]}
              rooms={rooms}
          />}
        </>
      )}
    </div>
  );
};

export default App;
