import React, { useState, useEffect, useContext } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.scss';
import AddNewRoom from './components/Room/AddNewRoom';
import RoomDto from './models/Room.dto';
import { useChat } from './utils/SocketService';
import User from './models/User';
import MessageDto from './models/Message';

const App = () => {
  const chatContext = useChat();

  chatContext.init();
  const [user, setUser] = useState();
  const [roomAdding, settingNewRoom] = useState(false);
  const initialRoomsState: RoomDto[] = [];
  const [rooms, setRooms] = useState(initialRoomsState);
  const initalMessagesState: MessageDto[] = [];
  const [messages, setMessages] = useState(initalMessagesState);

  useEffect(() => {
    chatContext.socket.emit('getRooms');
    chatContext.socket.on('roomsFetched', (rooms: RoomDto[]) => {
      setRooms(rooms);
    });

    return () => {
      chatContext.disconnect();
    };
  }, [0]);

  chatContext.socket.on('getMessages', (newMessages: MessageDto[]) => {
    setMessages([...newMessages]);
  });

  const handleSetUser = (newUser: User): void => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  const handleAddNewRoom = (): void => {
    settingNewRoom(true);
  };

  chatContext.socket.on('roomAdded', (newRoom: RoomDto) => {
    settingNewRoom(false);
    setRooms([...rooms, newRoom]);
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
            <Chat
              user={user}
              onAddNewRoom={handleAddNewRoom}
              handleLogout={handleLogout}
              messages={[...messages]}
              rooms={rooms}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
