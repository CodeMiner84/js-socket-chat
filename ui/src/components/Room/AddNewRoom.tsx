import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import { useChat } from '../../ChatContext';

interface Props {
  backToChat: () => void;
}

export default function AddNewRoom({ backToChat }: Props) {
  const chatContext = useChat();
  const [stateRoom, saveRoomName] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  chatContext.socket.on('roomAlreadyExists', () => {
    setErrorMessage('Room already exists');
  });

  return (
    <Container className="Login" component="main" fixed>
      <form className="form" noValidate>
        <Grid container spacing={2} style={{ height: '100vh' }} direction="row" alignItems="center" justify="center">
          <Grid item xs={12} sm={6} lg={4}>
            {errorMessage && (
              <Alert id="login-alert" variant="outlined" severity="error">
                {errorMessage}
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
                chatContext.socket.emit('addRoom', { value: stateRoom });
              }}
            >
              Add new room
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-submit flex dark"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                setErrorMessage('');
                backToChat();
              }}
            >
              Back to chat
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
