import * as SocketIO from "socket.io";
import * as uuidv4 from 'uuid/v4';
import {addUser, getAllUsers} from "../redis/user";
import UserDto from "../models/user.dto";
import events from '../config/events';
import InputDto from "../common/input.dto";

export async function listenUsers (socket: any) {
  socket.on(events.SET_USER, async function (input: InputDto) {
    try {
      const user: UserDto = {
        id: uuidv4(),
        name: input.value,
      };

      await addUser(user);

      socket.emit(events.USER_ADDED, user);
    } catch (error) {
      socket.emit(events.USER_ALREADY_EXISTS);
    }
  });

  socket.on(events.GET_USERS, async function () {
    try {
      socket.emit(events.USERS_FETCHED, await getAllUsers());
    } catch (error) {
    }
  });
}
