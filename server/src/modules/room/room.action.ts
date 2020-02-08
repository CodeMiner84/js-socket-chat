import * as uuidv4 from 'uuid/v4';
import * as SocketIO from "socket.io";
import events from '../../config/events';
import RoomDto from "./room.dto";
import {addRoom, getAllRooms} from "./room.service";
import InputDto from "../../common/input.dto";

export async function watchRooms (io: SocketIO.Server, socket: SocketIO.Socket) {
  socket.on(events.ADD_ROOM, async function (room: InputDto) {
    try {
      await addRoom({
        id: uuidv4(),
        name: room.value,
      });

      socket.emit(events.ROOM_ADDED, room);

      io.sockets.emit(events.ROOMS_FETCHED, await getAllRooms());
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
}