import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import UsersList from '../UsersList';
import Room from '../Room';
import { useChat } from '../../ChatContext';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import config from '../../config';
import MessageDto from '../../models/Message';

interface Props {
  onAddNewRoom: () => void;
  handleLogout: () => void;
  messages: MessageDto[];
  rooms: any;
}

export default function Chat({ onAddNewRoom, handleLogout, messages, rooms }: Props) {
  const chatContext = useChat();
  const initalMessagesState: MessageDto[] = [];
  const [newMessages, setMessages] = useState(initalMessagesState);

  const handleMessage = (message: string) => {
    chatContext.socket.emit('addMessage', { message, userId: localStorage.getItem(config.user) });
  };

  useEffect(() => {
    chatContext.socket.on('receiveMessage', (newMessage: MessageDto) => {
      newMessages.push(newMessage);
      setMessages([...newMessages]);
    });

    chatContext.socket.on('roomChanged', () => setMessages([]));
  }, [messages]);

  return (
    <Container id="chat" className="Login" component="main" fixed>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <UsersList handleLogout={handleLogout} />
        </Grid>
        <Grid item xs={12} lg={6} id="messages-box">
          <MessagesList initialMessages={[...messages, ...newMessages]} />
          <MessageInput handleMessage={handleMessage} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Room onAddNewRoom={onAddNewRoom} rooms={rooms} />
        </Grid>
      </Grid>
    </Container>
  );
}
