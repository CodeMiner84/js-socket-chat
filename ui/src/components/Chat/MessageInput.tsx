import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
  handleMessage: (message: string) => void;
}

export default function MessageInput({ handleMessage }: Props) {
  return (
    <div id="message-input">
      <TextField
        required
        variant="filled"
        fullWidth
        name="message"
        label="Type message"
        type="text"
        id="message"
        autoComplete="message"
        className="flex"
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          handleMessage(e.target.value);
        }}
      />
    </div>
  );
}
