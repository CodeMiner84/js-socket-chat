import React, {useEffect} from 'react';
import RoomDto from '../../models/Room.dto';
import { useChat } from '../../ChatContext';
import config from '../../config';
import {List, ListItem} from "@material-ui/core";

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

  useEffect(() => {
    if (localStorage.getItem(config.user)) {
      onRoomChange(localStorage.getItem(config.user) as string);
    }
  });

  return (
    <div>
      <div className="box-header">AVAILABLE ROOMS:</div>
      <List>
        {rooms && rooms.map((room: RoomDto) => <ListItem onClick={() => onRoomChange(room.id)}>{room.name}</ListItem>)}
      </List>
    </div>
  );
}
