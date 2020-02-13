import React, { useEffect } from 'react';
import { List, ListItem } from '@material-ui/core';
import RoomDto from '../../models/Room.dto';
import { useChat } from '../../ChatContext';
import config from '../../config';

interface Props {
  rooms: RoomDto[];
}

export default function RoomList({ rooms }: Props) {
  const chatContext = useChat();

  const onRoomChange = (roomId: string) => {
    chatContext.socket.emit('changeRoom', {
      roomId,
      userId: localStorage.getItem(config.user),
    });
  };

  return (
    <div>
      <div className="box-header">AVAILABLE ROOMS:</div>
      <List>
        {rooms &&
          rooms.map((room: RoomDto) => (
            <ListItem
              onClick={() => {
                onRoomChange(room.id);
                chatContext.socket.emit('fetchMessages', { userId: localStorage.getItem(config.user) });
              }}
            >
              {room.name}
            </ListItem>
          ))}
      </List>
    </div>
  );
}
