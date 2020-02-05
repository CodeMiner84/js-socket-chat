import * as express from 'express';
import 'babel-polyfill';
import * as path from 'path';
import * as logger from 'morgan';
import { Server, createServer } from 'http';
import * as SocketIO from "socket.io";
import redisClient from './redis-client';
import { setNickName } from "./modules/users";


const app = express();
const server: Server = createServer(app);
let io = SocketIO(server);
const port = 8080;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket: any) {
    console.log('connecting');
    socket.on('setNickName', async function (data) {
        console.log('data', data);
        setNickName(data.value);
    });
    //
    // socket.on('sendMessage', async function (data) {
    //
    //     const key = 'rooms';
    //     console.log('data', data);
    //     console.log('data', data.room);
    //     const currentRooms = await redisClient.getAsync(key);
    //     let rooms = JSON.parse(currentRooms) || [];
    //
    //     rooms.push(data.room);
    //     console.log('rooms', rooms);
    //     console.log('rooms', JSON.stringify(rooms));
    //
    //     // console.log('', );
    //     await redisClient.setAsync(key, JSON.stringify(rooms));
    //     //
    //     // const rawData = await redisClient.getAsync(key);
    //     // socket.emit('message', JSON.parse(rawData));
    //     console.log('send message');
    // });
});


