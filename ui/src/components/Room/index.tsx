import React, { useEffect, useState } from 'react';
import List from './List';
import AddRoomButton from './AddRoomButton';
import RoomDto from '../../models/RoomDto';
import UserDto from '../../models/UserDto';

interface Props {
  onAddNewRoom: () => void;
  rooms: RoomDto[];
  user: null | string;
}

export default function Room({ user, onAddNewRoom, rooms }: Props) {
  return (
    <div id="rooms-list">
      <AddRoomButton onAddNewRoom={onAddNewRoom} />
      <List user={user} rooms={rooms} />
    </div>
  );
}
