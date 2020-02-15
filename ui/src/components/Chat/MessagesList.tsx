import React, { useEffect, useState } from 'react';
import { ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Message from '../../models/Message';
import MessageDto from '../../models/Message';
import RoomDto from "../../models/Room.dto";

interface Props {
  initialMessages: MessageDto[];
  room: null|RoomDto;
}

export default function MessagesList({ room, initialMessages }: Props) {
  return (
    <div  id="messages">
      <div className="room-header">{room ? room.name : null}</div>
      <List>
        {initialMessages.map((message: Message) => {
          return (
            <ListItem>
              <ListItemText primary={message.user} secondary={<>{message.message}</>} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
