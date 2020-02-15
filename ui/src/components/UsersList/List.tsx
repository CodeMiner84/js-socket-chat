import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar } from '@material-ui/core';
import { useChat } from '../../utils/SocketService';
import User from '../../models/User';

interface Props {}

export default function UsersList({}: Props) {
  const chatContext = useChat();
  const initialState: User[] = [];
  const [users, setUsers] = useState(initialState);

  chatContext.socket.on('usersFetched', (users: User[]) => {
    setUsers(users);
  });

  return (
    <List disablePadding>
      {users.map((user: User) => (
        <ListItem>
          <ListItemAvatar>
            <Avatar>{user.name.substring(0, 2)}</Avatar>
          </ListItemAvatar>
          <ListItemText>{user.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}
