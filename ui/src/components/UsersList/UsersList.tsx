import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import * as SocketIO from 'socket.io';
import config from '../../config';

interface Props {
  socket: SocketIO.Server;
}

export default function UsersList({ socket }: Props) {
  const [users, setUsers] = useState([]);

  socket.on('refreshUsers', () => {
    console.log('refreshing users list');
  });

  useEffect(() => {
    socket.emit('getUsers');
  }, [socket]);

  console.log('users', users);

  return (
    <div id="users-list">
      <div>Users list:</div>
      <ul>
        {users.map((user: string) => (
          <li>{user}</li>
        ))}
      </ul>
    </div>
  );
}
