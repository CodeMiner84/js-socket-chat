import * as uuidv4 from 'uuid/v4';
import * as SocketIO from "socket.io";
import events from '../config/events';
import {addRoom, getAllRooms, getRoom} from "../redis/room";
import InputDto from "../models/input.dto";
import ChangeRoomDto from "../models/change.room.dto";
import {changeUserRoom, getUser, getUserRoom} from "../redis/user";
import RoomDto from "../models/room.dto";

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

  socket.on(events.CHANGE_ROOM, async function (input: ChangeRoomDto) {
    try {
      let room: RoomDto = await getRoom(input.roomId as string);
      if (!room) {
        const userRoom = await getUserRoom(input.userId);
        if (!userRoom) {
          throw Error(`No selected room for user ${input.userId}`);
        }
        room = (await getRoom(userRoom.id)) as RoomDto;
      }
      socket.join(room.id);
      await changeUserRoom(input.userId, room.id);

      await socket.emit(events.ROOM_CHANGED, room);
    } catch (error) {
      console.log('error', error);
      socket.emit(events.ROOM_CHANGE_ERROR);
    }
  });
}

