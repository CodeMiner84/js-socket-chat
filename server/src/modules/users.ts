import * as SocketIO from "socket.io";
import {addUser, getAllUsers} from "../redis/user";
import UserDto from "../models/user.dto";
import events from '../config/events';

export async function watchUsers (socket: any) {
  socket.on(events.SET_USER, async function (data: UserDto) {
    try {
      await addUser(data.value);
      socket.join('test');

      socket.emit(events.USER_ADDED, data.value);
    } catch (error) {
      socket.emit(events.USER_ALREADY_EXISTS);
    }
  });
  socket.on(events.GET_USERS, async function () {
    try {
      console.log('pobieram userów');
      socket.emit(events.USERS_FETCHED, await getAllUsers());
    } catch (error) {
      console.log('errrrrrr;');
    }
  });
}
