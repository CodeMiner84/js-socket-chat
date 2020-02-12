import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  handleMessage: (message: string) => void;
}

export default function MessageInput({ handleMessage }: Props) {
  const [message, setMessage] = useState();

  const onTyping = (message: string) => {
    setMessage(message);
  }

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
        value={message}
        autoComplete="message"
        className="flex"
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          onTyping(e.target.value);
        }}
        onKeyPress={(key) => {
          if (key.charCode === 13) {
            handleMessage(message);
            setMessage('');
          }
        }}
      />
    </div>
  );
}
