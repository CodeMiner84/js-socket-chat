import React, { useEffect } from 'react';
import { List, ListItem } from '@material-ui/core';
import RoomDto from '../../models/RoomDto';
import { useChat } from '../../utils/SocketService';
import UserDto from '../../models/UserDto';

interface Props {
  rooms: RoomDto[];
  user: null | string;
}

export default function RoomList({ user, rooms }: Props) {
  const chatContext = useChat();
  const onRoomChange = async (roomId: string) => {
    if (user) {
      await chatContext.socket.emit('changeRoom', {
        roomId,
        userId: user,
      });

      await chatContext.socket.emit('fetchMessages', { value: user });
    }
  };


  return (
    <div className="box">
      <div className="box-header">AVAILABLE ROOMS:</div>
      <List>
        {rooms &&
          rooms.map((room: RoomDto) => (
            <ListItem
              onClick={() => {
                onRoomChange(room.id);
              }}
            >
              {room.name}
            </ListItem>
          ))}
      </List>
    </div>
  );
}
