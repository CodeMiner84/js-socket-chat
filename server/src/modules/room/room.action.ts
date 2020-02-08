import * as uuidv4 from 'uuid/v4';
import * as SocketIO from "socket.io";
import events from '../../config/events';
import {addRoom, getAllRooms} from "./room.service";
import InputDto from "../../common/input.dto";

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
      console.log('GET_ROOMS')
      socket.emit(events.ROOMS_FETCHED, await getAllRooms());
    } catch (error) {
    }
  });
}

