import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import UsersList from '../UsersList';
import Room from '../Room';
import { useChat } from '../../ChatContext';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import MessageDto from '../../models/Message';
import User from '../../models/User';
import RoomDto from '../../models/Room.dto';

interface Props {
  onAddNewRoom: () => void;
  handleLogout: () => void;
  messages: MessageDto[];
  user: User | null;
  rooms: any;
}

export default function Chat({ user, onAddNewRoom, handleLogout, messages, rooms }: Props) {
  const chatContext = useChat();
  const initialRoom: null | RoomDto = null;
  const [room, setRoom] = useState();
  const initalMessagesState: MessageDto[] = [];
  const [newMessages, setMessages] = useState(initalMessagesState);

  const handleMessage = (message: string) => {
    if (user) {
      chatContext.socket.emit('addMessage', { message, userId: user.id });
    }
  };

  useEffect(() => {
    chatContext.socket.on('receiveMessage', (newMessage: MessageDto) => {
      newMessages.push(newMessage);
      setMessages([...newMessages]);
    });

    chatContext.socket.on('roomChanged', (room: RoomDto) => {
      setMessages([]);
      setRoom(room);
      chatContext.socket.emit('getUsers');
    });
  }, [messages]);

  return (
    <Container id="chat" className="Login" component="main" fixed>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <UsersList handleLogout={handleLogout} />
        </Grid>
        <Grid item xs={12} lg={6} id="messages-box">
          <MessagesList room={room} initialMessages={[...messages, ...newMessages]} />
          <MessageInput handleMessage={handleMessage} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Room user={user} onAddNewRoom={onAddNewRoom} rooms={rooms} />
        </Grid>
      </Grid>
    </Container>
  );
}
