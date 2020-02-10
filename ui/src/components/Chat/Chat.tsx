import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import UsersList from '../UsersList';
import Room from '../Room';
import RoomDto from '../../models/Room.dto';
import { useChat } from '../../ChatContext';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import config from "../../config";

interface Props {
  onAddNewRoom: () => void;
  handleLogout: () => void;
}

export default function Chat({ onAddNewRoom, handleLogout }: Props) {
  const chatContext = useChat();
  const deafultState: RoomDto[] = [];
  const [rooms, setRooms] = useState(deafultState);

  chatContext.socket.on('roomAdded', (newRoom: RoomDto) => {
    setRooms([...rooms, newRoom]);
  });

  const handleMessage = (message: string) => {
    chatContext.socket.emit('addMessage', { message: message, userId: localStorage.getItem(config.user) });
  };

  useEffect(() => {
    chatContext.socket.emit('getRooms');

    chatContext.socket.on('roomsFetched', (rooms: RoomDto[]) => {
      setRooms(rooms);
    });
  }, [0]);

  return (
    <Container id="chat" className="Login" component="main" fixed>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <UsersList handleLogout={handleLogout} />
        </Grid>
        <Grid item xs={12} lg={6} id="messages-box">
          <MessagesList />
          <MessageInput handleMessage={handleMessage} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Room onAddNewRoom={onAddNewRoom} rooms={rooms} />
        </Grid>
      </Grid>
    </Container>
  );
}
