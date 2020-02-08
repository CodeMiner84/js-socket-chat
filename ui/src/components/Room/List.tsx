import React, { useEffect, useState } from 'react';
import RoomDto from './Room.dto';
import { useChat } from '../../ChatContext';

export default function List() {
  const chatContext = useChat();
  const [rooms, setRooms] = useState();

  useEffect(() => {
    chatContext.socket.emit('getRooms');

    chatContext.socket.on('roomsFetched', (rooms: RoomDto[]) => {
      setRooms(rooms);
    });
  }, [0]);

  return (
    <div>
      <div>Rooms list:</div>
      <ul>{rooms && rooms.map((room: RoomDto) => <li>{room.name}</li>)}</ul>
    </div>
  );
}
