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
  console.log('initialMessages', initialMessages);
  return (
    <div id="messages">
      <div className="room-header">{room ? room.name : null}</div>
      <List>
        {initialMessages.map((message: MessageDto) => {
          return (
            <ListItem>
              {message.info && (
                <div className="info">
                  {message.message}
                </div>
              )}
              {!message.info && (
                <div>
                  <div className="user-date">
                    <span className="user">{message.userName}</span>
                    <span className="date">{message.created}</span>
                  </div>
                  <p>{message.message}</p>
                </div>
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
