import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import RoomDto from '../../models/RoomDto';

interface Props {
  handleMessage: (message: string) => void;
  room: null | RoomDto;
}

export default function MessageInput({ handleMessage, room }: Props) {
  const [message, setMessage] = useState();

  const onTyping = (typingMessage: string) => {
    setMessage(typingMessage);
  };

  return (
    <div id="message-input">
      <TextField
        required
        variant="filled"
        fullWidth
        disabled={room === undefined}
        name="message"
        label="Type message"
        type="text"
        id="message"
        value={message}
        autoComplete="message"
        className="flex"
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          onTyping(e.target.value);
        }}
        onKeyPress={key => {
          if (key.charCode === 13) {
            handleMessage(message);
            setMessage('');
          }
        }}
      />
    </div>
  );
}
