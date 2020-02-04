import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

interface Props {
    nickName: string;
}

export default function Chat({ nickName }: Props) {
    return (
    <Container id="chat" className="Login" component="main" fixed>
        <Grid container spacing={3}>
            <Grid item xs>
                <Paper >xs</Paper>
            </Grid>
            <Grid item xs>
                <Paper >xs</Paper>
            </Grid>
            <Grid item xs>
                <Paper >xs</Paper>
            </Grid>
        </Grid>
    </Container>
    );
}
