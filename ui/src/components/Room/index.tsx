import React, { useEffect, useState } from 'react';
import List from './List';
import AddRoomButton from './AddRoomButton';
import RoomDto from '../../models/Room.dto';
import User from '../../models/User';
import { useChat } from '../../utils/SocketService';

interface Props {
  onAddNewRoom: () => void;
  rooms: RoomDto[];
  user: null|User;
}

export default function Room({ user, onAddNewRoom, rooms }: Props) {
  const chatContext = useChat();
  const initialState: RoomDto[] = [];
  const [room, setRoom] = useState(initialState);

  useEffect(() => {
    chatContext.socket.on('roomAdded', (newRoom: RoomDto) => {
      setRoom([...room, newRoom]);
    });
  }, [0]);

  return (
    <div id="rooms-list">
      <AddRoomButton onAddNewRoom={onAddNewRoom} />
      <List user={user} rooms={[...rooms, ...room]} />
    </div>
  );
}
