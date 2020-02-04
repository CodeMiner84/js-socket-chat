import express from 'express';
import 'babel-polyfill';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as http from 'http'
import SocketIO from 'socket.io';
import redisClient from './redis-client';

const app = express();
const server = http.Server(app);
let io = new SocketIO(server);
const port = 8080;


server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
  console.log('connecting');
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });

  socket.on('sendMessage', async function (data) {

  const key = 'rooms';
    console.log('data', data);
    console.log('data', data.room);
    const currentRooms = await redisClient.getAsync(key);
    let rooms = JSON.parse(currentRooms) || [];

    rooms.push(data.room);
    console.log('rooms', rooms);
    console.log('rooms', JSON.stringify(rooms));

    // console.log('', );
    await redisClient.setAsync(key, JSON.stringify(rooms));
    //
    // const rawData = await redisClient.getAsync(key);
    // socket.emit('message', JSON.parse(rawData));
    console.log('send message');
  });
});


