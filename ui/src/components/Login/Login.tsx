import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import * as SocketIO from 'socket.io';

interface Props {
  setNickName: (value: string) => void;
  nickname?: string;
  socket: SocketIO.Server;
}

export default function Login({ socket, setNickName, nickname }: Props) {
  const [nickName, changeNickName] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  socket.on('nickNameExist', () => {
    setErrorMessage('NickName already exists');
  });

  socket.on('nickNameAdded', (newNickName: string) => {
    setNickName(newNickName);
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
              name="nickname"
              label="Nickname"
              type="text"
              id="password"
              autoComplete="current-password"
              className="flex"
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                changeNickName(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="login-submit flex"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
                setErrorMessage('');
                socket.emit('setNickName', { value: nickName });
              }}
            >
              Set nickname
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
