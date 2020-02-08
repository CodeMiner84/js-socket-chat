import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import UsersList from '../UsersList';
import Room from '../Room';

interface Props {
  onAddNewRoom: () => void;
}

export default function Chat({ onAddNewRoom }: Props) {
  return (
    <Container id="chat" className="Login" component="main" fixed>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={3}>
          <UsersList />
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className="chat-box" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Room onAddNewRoom={onAddNewRoom} />
        </Grid>
      </Grid>
    </Container>
  );
}
