import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { AppContext } from '../../AppProvider';

interface Props {
  setNickName: (value: string) => void;
  nickname?: string;
  socket: any;
}

export default function Login(props: Props) {
  const [nickName, setNickName] = useState();

  return (
    <Container className="Login" component="main" fixed>
      <form className="form" noValidate>
        <Grid container spacing={2} style={{ height: '100vh' }} direction="row" alignItems="center" justify="center">
          <Grid item xs={12} sm={6} lg={4}>
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
                setNickName(e.target.value);
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
                // props.setNickName(nickName);
                props.socket.emit('setNickName', { value: nickName });
              }}>
              Set nickname
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
