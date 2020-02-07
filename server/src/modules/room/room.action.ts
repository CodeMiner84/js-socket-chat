import * as uuidv4 from 'uuid/v4';
import events from '../../config/events';
import RoomDto from "./room.dto";
import {addRoom, getAllRooms} from "./room.service";

export async function watchRooms (socket: any) {
  socket.on(events.SET_ROOM, async function (room: RoomDto) {
    try {
      await addRoom({
        id: uuidv4(),
        name: room.id,
      });

      socket.emit(events.ROOM_ADDED, room);
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
