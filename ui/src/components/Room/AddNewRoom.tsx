import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import * as SocketIO from 'socket.io';
import RoomDto from './Room.dto';

interface Props {
  socket: SocketIO.Server;
  handleAddRoom: (newRoom: RoomDto) => void;
}

export default function AddNewRoom({ socket, handleAddRoom }: Props) {
  const [stateRoom, saveRoomName] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  socket.on('roomExist', () => {
    setErrorMessage('User already exists');
  });

  socket.on('roomAdded', (newRoom: RoomDto) => {
    handleAddRoom(newRoom);
  });

  return (
    <Container className="Login" component="main" fixed>
      <form className="form" noValidate>
        <Grid container spacing={2} style={{ height: '100vh' }} direction="row" alignItems="center" justify="center">
          <Grid item xs={12} sm={6} lg={4}>
            {errorMessage && (
              <Alert id="login-alert" variant="outlined" severity="error">
                Room already taken!
              </Alert>
            )}
            <TextField
              required
              variant="filled"
              fullWidth
              name="room"
              label="Room"
              type="text"
              id="password"
              autoComplete="current-password"
              className="flex"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                saveRoomName(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-submit flex dark"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                setErrorMessage('');
                socket.emit('addRoom', { value: stateRoom });
              }}
            >
              Add new room
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
