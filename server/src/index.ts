import * as express from 'express';
import 'babel-polyfill';
import * as path from 'path';
import * as logger from 'morgan';
import SocketListener from "./listeners/socket.listener";

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const socket = new SocketListener(app);
socket.listen();
