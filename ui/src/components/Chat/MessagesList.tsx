import React, { useEffect, useState } from 'react';
import { ListItem } from '@material-ui/core';
import List from '@material-ui/core/List';
import MessageDto from '../../models/MessageDto';
import RoomDto from '../../models/RoomDto';

interface Props {
  initialMessages: MessageDto[];
  room: null | RoomDto;
}

export default function MessagesList({ room, initialMessages }: Props) {
  return (
    <div id="messages">
      <div className="room-header">{room ? room.name : null}</div>
      <List>
        {initialMessages.map((message: MessageDto) => {
          return (
            <ListItem>
              <div>
                <div className="user-date">
                  <span className="user">{message.user}</span>
                  <span className="date">{message.created}</span>
                </div>
                <p>{message.message}</p>
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
