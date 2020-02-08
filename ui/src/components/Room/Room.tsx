import React from 'react';
import List from './List';
import AddRoomButton from './AddRoomButton';

interface Props {
  onAddNewRoom: () => void;
}

export default function Room({ onAddNewRoom }: Props) {
  return (
    <div id="rooms-list">
      <AddRoomButton onAddNewRoom={onAddNewRoom} />
      <List />
    </div>
  );
}
