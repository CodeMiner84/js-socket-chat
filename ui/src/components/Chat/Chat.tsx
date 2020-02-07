import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import * as SocketIO from 'socket.io';
import UsersList from '../UsersList';
import Room from '../Room';

interface Props {
  socket: SocketIO.Server;
  onAddNewRoom: () => void;
}

export default function Chat({ socket, onAddNewRoom }: Props) {
  return (
    <Container id="chat" className="Login" component="main" fixed>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={3}>
          <UsersList socket={socket} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className="chat-box" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Room socket={socket} onAddNewRoom={onAddNewRoom} />
        </Grid>
      </Grid>
    </Container>
  );
}
