import React from 'react';
import List from './List';
import AddRoomButton from './AddRoomButton';
import RoomDto from '../../models/Room.dto';

interface Props {
  onAddNewRoom: () => void;
  rooms: RoomDto[];
}

export default function Room({ onAddNewRoom, rooms }: Props) {
  return (
    <div id="rooms-list">
      <AddRoomButton onAddNewRoom={onAddNewRoom} />
      <List rooms={rooms} />
    </div>
  );
}
