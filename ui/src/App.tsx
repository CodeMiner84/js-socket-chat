import React, { useState, useEffect, useContext } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.scss';
import AddNewRoom from './components/Room/AddNewRoom';
import RoomDto from './models/RoomDto';
import { useChat } from './utils/SocketService';
import UserDto from './models/UserDto';
import MessageDto from './models/MessageDto';

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
    chatContext.socket.on('roomsFetched', (fetchedRooms: RoomDto[]) => {
      setRooms(fetchedRooms);
    });

    return () => {
      chatContext.disconnect();
    };
  }, [0]);

  chatContext.socket.on('messagesFetched', (newMessages: MessageDto[]) => {
    setMessages([...newMessages]);
  });

  const handleSetUser = (newUser: UserDto): void => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  const handleAddNewRoom = (): void => {
    settingNewRoom(true);
  };

  chatContext.socket.on('roomAdded', (roomsList: RoomDto[]) => {
    settingNewRoom(false);
    setRooms(roomsList);
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
