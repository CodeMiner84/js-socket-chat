import React from 'react';
import RoomDto from './Room.dto';

export default function List({ rooms }: any) {
  return (
    <div>
      <div>Rooms list:</div>
      <ul>{rooms && rooms.map((room: RoomDto) => <li>{room.name}</li>)}</ul>
    </div>
  );
}
