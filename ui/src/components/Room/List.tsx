import React, { useEffect } from 'react';
import { List, ListItem } from '@material-ui/core';
import RoomDto from '../../models/Room.dto';
import { useChat } from '../../ChatContext';
import config from '../../config';
import User from "../../models/User";

interface Props {
    rooms: RoomDto[];
    user: User|null;
}

export default function RoomList({ user, rooms }: Props) {
  const chatContext = useChat();
  const onRoomChange = async (roomId: string) => {
      if (user) {
          await chatContext.socket.emit('changeRoom', {
              roomId,
              userId: user.id,
          });

          await chatContext.socket.emit('fetchMessages', {userId: user.id});
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
