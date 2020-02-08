import React, { useEffect, useState } from 'react';
import { useChat } from '../../ChatContext';

interface Props {}

export default function List({}: Props) {
  const chatContext = useChat();
  const [users, setUsers] = useState([]);

  chatContext.socket.on('refreshUsers', () => {
    console.log('refreshing users list');
  });

  useEffect(() => {
    chatContext.socket.emit('getUsers');
  }, [0]);

  return (
    <ul>
      {users.map((user: string) => (
        <li>{user}</li>
      ))}
    </ul>
  );
}
