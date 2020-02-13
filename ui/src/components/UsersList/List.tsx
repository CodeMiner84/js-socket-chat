import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar } from '@material-ui/core';
import { useChat } from '../../ChatContext';

interface Props {}

export default function UsersList({}: Props) {
  const chatContext = useChat();
  const initialState: string[] = [];
  const [users, setUsers] = useState(initialState);

  chatContext.socket.on('refreshUsers', () => {
    console.log('refreshing users list');
  });

  useEffect(() => {
    chatContext.socket.emit('getUsers');

    setUsers(['mike', 'dejv', 'parys']);
  }, [0]);

  return (
    <List disablePadding>
      {users.map((user: string) => (
        <ListItem>
          <ListItemAvatar>
            <Avatar>{user.substring(0, 2)}</Avatar>
          </ListItemAvatar>
          <ListItemText>{user}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
