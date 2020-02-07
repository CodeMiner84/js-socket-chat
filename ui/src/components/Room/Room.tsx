import React, { useEffect, useState } from 'react';
import * as SocketIO from 'socket.io';
import RoomDto from "./room.dto";

interface Props {
  socket: SocketIO.Server;
}

export default function Room({ socket }: Props) {
  const [rooms, setRooms] = useState();

  socket.on('roomsFetched', (rooms: RoomDto[]) => {
    setRooms(rooms);
  });

  useEffect(() => {
    socket.emit('getRooms');
  }, [socket]);

  return (
    <div id="rooms-list">
      <div>Rooms list:</div>
      <ul>
        {rooms && rooms.map((room: any) => (
          <li>{room.name}</li>
        ))}
      </ul>
    </div>
  );
}
