import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import { useChat } from '../../utils/SocketService';
import UserDto from '../../models/UserDto';

interface Props {
  handleSetUser: (value: UserDto) => void;
  user?: string;
}

export default function Login({ handleSetUser, user }: Props) {
  const chatContext = useChat();
  const [stateUser, changeUser] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  chatContext.socket.on('userExists', () => {
    setErrorMessage('User already exists');
  });

  chatContext.socket.on('userAdded', (newUser: UserDto) => {
    handleSetUser(newUser);
  });

  return (
    <Container className="Login" component="main" fixed>
      <form className="form" noValidate>
        <Grid container spacing={2} style={{ height: '100vh' }} direction="row" alignItems="center" justify="center">
          <Grid item xs={12} sm={6} lg={4}>
            {errorMessage && (
              <Alert id="login-alert" variant="outlined" severity="error">
                Nickname already taken!
              </Alert>
            )}
            <TextField
              required
              variant="filled"
              fullWidth
              name="user"
              label="Nickname"
              type="text"
              id="password"
              autoComplete="current-password"
              className="flex"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                changeUser(e.target.value);
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
                chatContext.socket.emit('setUser', { value: stateUser });
              }}
            >
              Set user
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
