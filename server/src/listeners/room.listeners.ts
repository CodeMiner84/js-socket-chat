import * as uuidv4 from 'uuid/v4';
import * as SocketIO from "socket.io";
import events from '../config/events';
import {addRoom, getAllRooms, getRoom} from "../redis/room";
import InputDto from "../common/input.dto";
import ChangeRoom from "../models/change.room.dto";
import {changeUserRoom, getUser, getUserRoom} from "../redis/user";

export async function listenRooms (io: SocketIO.Server, socket: SocketIO.Socket) {
  socket.on(events.ADD_ROOM, async function (input: InputDto) {
    try {
      const room = {
        id: uuidv4(),
        name: input.value,
      };
      await addRoom(room);

      io.sockets.emit(events.ROOM_ADDED, room);
    } catch (error) {
      socket.emit(events.ROOM_ALREADY_EXISTS);
    }
  });

  socket.on(events.GET_ROOMS, async function () {
    try {
      socket.emit(events.ROOMS_FETCHED, await getAllRooms());
    } catch (error) {
    }
  });

  socket.on(events.CHANGE_ROOM, async function (input: ChangeRoom) {
    try {
      console.log('Changing room input value', input);
      let roomId = input.roomId;
      if (!roomId) {
        roomId = await getUserRoom(input.userId);
        console.log('Selecting user room ', roomId);
        if (!roomId) {
          throw Error(`No selected room for user ${input.userId}`);
        }
      }
      await changeUserRoom(input.userId, roomId);

      socket.emit(events.ROOM_CHANGED, roomId);
      socket.join(roomId);
      console.log(`Join room ${roomId}`);
    } catch (error) {
      console.log('error occurs', error);
      socket.emit(events.ROOM_CHANGE_ERROR);
    }
  });
}

