import React from 'react';
import List from './List';
import AddRoomButton from './AddRoomButton';
import RoomDto from '../../models/Room.dto';
import User from '../../models/User';

interface Props {
  onAddNewRoom: () => void;
  rooms: RoomDto[];
  user: User | null;
}

export default function Room({ user, onAddNewRoom, rooms }: Props) {
  return (
    <div id="rooms-list">
      <AddRoomButton onAddNewRoom={onAddNewRoom} />
      <List user={user} rooms={rooms} />
    </div>
  );
}
