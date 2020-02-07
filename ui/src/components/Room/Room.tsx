import React, { useEffect, useState } from 'react';
import * as SocketIO from 'socket.io';
import RoomDto from './Room.dto';
import { getKey } from '../../utils/storage';
import List from './List';
import AddRoomButton from './AddRoomButton';

interface Props {
  socket: SocketIO.Server;
  onAddNewRoom: () => void;
}

export default function Room({ socket, onAddNewRoom }: Props) {
  return (
    <div id="rooms-list">
      <AddRoomButton onAddNewRoom={onAddNewRoom} />
      <List socket={socket} />
    </div>
  );
}
