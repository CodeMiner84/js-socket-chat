import * as express from 'express';
import 'babel-polyfill';
import * as path from 'path';
import * as logger from 'morgan';
import { Server, createServer } from 'http';
import * as SocketIO from "socket.io";
import redisClient from './redis-client';
import { watchNickNames } from "./modules/users";
import {addNickName} from "./redis/nickaname";

const app = express();
const server: Server = createServer(app);
let io = SocketIO(server);
const port = 8080;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', async function (socket: any) {
    await watchNickNames(socket);
});

